import { UserStatuses } from '../../constants/userStatuses';

export class UserDto {
  constructor(user) {
    this.name = user.name;
    this.status = user.status;
    this.id = user.id;
  }

  static get schema() {
    return {
      title: 'UserSchema',
      type: 'object',
      required: [
        'name',
        'status',
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
        status: {
          type: 'number',
          example: UserStatuses.AVAILABLE,
        },
      }
    };
  }
}
