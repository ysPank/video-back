export class RedisWrapper {
  constructor({ RedisClient }) {
    this.redisClient = RedisClient;
  }

  expire(key, seconds) {
    return new Promise((resolve, reject) => {
      this.redisClient.expire(key, seconds, (error) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (error, value) => {
        return error ? reject(error) : resolve(value);
      });
    });
  }

  set(key, value, expiresIn) {
    return new Promise((resolve, reject) => {
      this.redisClient.setex(key, expiresIn, value, (error) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  del(...keys) {
    return new Promise((resolve, reject) => {
      this.redisClient.del(keys, (error) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  sadd(key, ...values) {
    return new Promise((resolve, reject) => {
      this.redisClient.sadd(key, values, (error, added) => {
        return error ? reject(error) : resolve(added);
      });
    });
  }

  smembers(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.smembers(key, (error, values) => {
        return error ? reject(error) : resolve(values);
      });
    });
  }

  lpush(key, values) {
    return new Promise((resolve, reject) => {
      this.redisClient.lpush(key, ...values, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  lrange(key, startIndex, endIndex) {
    return new Promise((resolve, reject) => {
      this.redisClient.lrange(key, startIndex, endIndex, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  lrem(key, index, value) {
    return new Promise((resolve, reject) => {
      this.redisClient.lrem(key, index, value, (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }
}
