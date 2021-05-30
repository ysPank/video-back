import { BasicHandler } from '../../base/BasicHandler';
import { UserDto } from '../../models/users';
import { HttpStatusCodes } from '../../constants/statusCodes';
import { generateCollection } from '../../base/CollectionDto';

export default class UsersRoutesHandler extends BasicHandler {
  constructor(container) {
    super();
    this.container = container;
    this.apiRoot = '/users';
  }

  setup() {
    const controller = this.container.UsersController;

    this.addRoute({
      path: '/',
      method: 'get',
      summary: 'Get user list API',
      description: 'Get users list',
      tags: ['Users'],
      auth: false,
      consumes: this.container.PaginationSchema,
      produces: generateCollection(UserDto).schema,
      responseStatus: HttpStatusCodes.OK,
      handler: controller.getList.bind(controller),
    });
  }
}
