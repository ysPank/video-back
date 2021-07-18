export default class TwolioController {
  constructor({ TwilioService }) {
    this.twilioService = TwilioService;
  }

  async getConfig() {
    return this.twilioService.getConfig();
  }
}
