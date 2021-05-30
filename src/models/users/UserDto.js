export class UserDto {
  constructor(user) {
    this.name = user.name;
    this.onCall = user.onCall;
    this.id = user.id;
  }

  static get schema() {
    return {
      title: 'UserSchema',
      type: 'object',
      required: [
        'name',
        'onCall',
      ],
      properties: {
        id: {
          type: 'string',
          description: 'UUID v4'
        },
        name: {
          type: 'string',
          example: 'Riley Reid'
        },
        onCall: {
          type: 'boolean',
          example: true,
        },
      }
    };
  }
}
