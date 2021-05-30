import BaseCRUD from '../../base/BaseCRUD';
import { UserDto } from '../../models/users';
import { generateCollection } from '../../base/CollectionDto';
import { RouteParams } from '../../base/RouteParams';

export default class UsersRoutesHandler extends BaseCRUD {
  constructor(container) {
    super();
    this.container = container;
    this.apiRoot = '/users';
    this.model = 'User';
  }

  setup() {
    const { container, model } = this;
    const controller = container.UsersController;

    this.addGetEntitiesListRoute(new RouteParams(
      container.PaginationSchema,
      generateCollection(UserDto).schema,
      controller,
      model
    ));
  }
}
