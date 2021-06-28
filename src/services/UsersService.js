import { v4 as uuid } from 'uuid';

import { paginateList } from '../utils/helpers/PaginateList';
import { generateName } from '../utils/helpers/NameGenerator';
import { UserStatuses } from '../constants/userStatuses';

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
   * @returns {number}
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
      status: UserStatuses.AVAILABLE,
    };

    this.users[model.id] = model;
    return model;
  }

  /**
   * Get user by socketId
   * @param id
  */
  getById(id) {
    return this.users[id];
  }

  /**
   * Get user by socketId
   * @param id
  */
  updateUserStatus(id, status = UserStatuses.AVAILABLE) {
    if(this.users[id]) {
      this.users[id].status = status;
    }

    return this.users[id];
  }

  /**
   * Delete user by id
   * @param {string} id
   * @returns {void}
  */
  deleteUser(id) {
    delete this.users[id];
  }
}
