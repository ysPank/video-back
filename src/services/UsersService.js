import { v4 as uuid } from 'uuid';

import { paginateList } from '../utils/helpers/PaginateList';
import { generateName } from '../utils/helpers/NameGenerator';

export default class UsersService {
  constructor() {
    this.users = {};
  }

  /**
   * Get list with pagination
   * @param {number} query.limit
   * @param {number} query.offset
  */
  getList(query) {
    return paginateList(Object.values(this.users), query);
  }

  /**
   * Get count of users
  */
  get count() {
    return Object.values(this.users).length;
  }

  /**
   * Add new user
   * @param socketId
  */
  handleUserCreation(socketId) {
    const model = {
      id: uuid(),
      socketId,
      name: generateName(Object.values(this.users).map(({ name } = {}) => name)),
      onCall: false,
    };

    this.users[model.id] = model;
    return model;
  }

  /**
   * Delete user by id
   * @param id
  */
  deleteUser(id) {
    delete this.users[id];
  }
}
