import { paginateList } from '../utils/helpers/PaginateList';

export default class UsersService {
  constructor() {
    this.users = [];
  }

  /**
   * Get list with pagination
   * @param {number} query.limit
   * @param {number} query.offset
  */
  getList(query) {
    return paginateList(this.users, query);
  }

  /**
   * Get count of users
  */
  get getCount() {
    return this.users.length;
  }
}
