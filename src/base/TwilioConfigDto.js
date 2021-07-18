export class TwilioConfigDto {
  static get schema() {
    return {
      title: 'TwilioConfigList',
      type: 'array',
      items: {
        title: 'TwilioConfig',
        type: 'object',
        required: [
          'urls'
        ],
        properties: {
          url: {
            type: 'string',
            description: 'non-standart property of server url'
          },
          urls: {
            type: 'string'
          },
          username: {
            type: 'string'
          },
          credential: {
            type: 'string'
          }
        }
      }
    };
  }
}
