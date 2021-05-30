import { PaginationHelper } from '../utils/helpers/PaginationHelper';
import { UserDto } from '../models/users';
import { generateCollection } from '../base/CollectionDto';

export default class UsersController {
  constructor({ UsersService }) {
    this.usersService = UsersService;
  }

  async getList({ query }) {
    const users = this.usersService.getList(query), count = this.usersService.getCount();

    return new (generateCollection(UserDto))(users, PaginationHelper.buildPagination(query, count));
  }
}
