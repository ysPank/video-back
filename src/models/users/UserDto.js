export class UserDto {
  constructor(user) {
    this.name = user.name;
    this.onCall = user.onCall;
  }

  static get schema() {
    return {
      title: 'UserSchema',
      type: 'object',
      allOf: [
        {
          type: 'object',
          required: [
            'name',
            'onCall',
          ],
          properties: {
            name: {
              type: 'string',
              example: 'Riley Reid'
            },
            onCall: {
              type: 'boolean',
              example: true,
            },
          }
        }
      ]
    };
  }
}
