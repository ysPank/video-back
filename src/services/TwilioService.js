import twilio from 'twilio';
import config from 'config';

export default class TwilioService {

  constructor() {
    this.client = twilio(
      config.get('twilio.SID'),
      config.get('twilio.token')
    );

    this.validBefore = 0;
  }

  async getConfig() {
    if(this.validBefore > new Date().valueOf()) {

      return this.iceServers;
    }

    const { iceServers, ttl } = await this.client.tokens.create();

    this.validBefore = new Date().valueOf() + ttl;
    this.iceServers = iceServers;

    return iceServers;
  }
}
