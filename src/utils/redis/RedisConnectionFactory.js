import { createClient } from 'redis';
// one hour
const MAX_TOTAL_RETRY_TIME = 3600000;
const MAX_ATTEMPTS = 10;
// one second
const RETRY_DELAY = 1000;

const ON_RECONNECTING = 'reconnecting';
const ON_ERROR = 'error';
const ON_CONNECT = 'connect';

export class RedisConnectionFactory {
  static connect({ config, LoggerFactory }) {
    const logger = LoggerFactory.createLogger('Redis');
    const redisConfig = config.get('redis');
    const _config = Object.assign({
      retry_strategy: RedisConnectionFactory.retryStrategy
    }, redisConfig);
    const client = createClient(_config);

    client.on(ON_RECONNECTING, (param) => {
      logger.warn(`Redis connection has not been established. Reconnecting... Attempt: ${param.attempt}`);

      if (param.attempt >= MAX_ATTEMPTS) {
        logger.error('Web server is going to shut down. Disconnecting...');
        process.exit(1);
      }
    });
    client.on(ON_ERROR, (error) => logger.error(error));
    client.on(ON_CONNECT, () => logger.info('Redis successfully connected'));
    return client;
  }

  static retryStrategy(options) {
    if (options.total_retry_time > MAX_TOTAL_RETRY_TIME) {
      // End reconnecting after a specific timeout
      // and flush all commands with a individual error
      return new Error('Retry time exhausted');
    }

    if (options.times_connected > MAX_ATTEMPTS) {
      // End reconnecting with built in error
      return options.error;
    }

    // reconnect after
    return RETRY_DELAY * options.times_connected;
  }
}
