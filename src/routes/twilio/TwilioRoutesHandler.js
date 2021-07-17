import { BasicHandler } from '../../base/BasicHandler';
import { HttpStatusCodes } from '../../constants/statusCodes';
import { TwilioConfigDto } from '../../base/TwilioConfigDto';

export default class UsersRoutesHandler extends BasicHandler {
  constructor(container) {
    super();
    this.container = container;
    this.apiRoot = '/twilio';
    this.model = 'Twilio';
  }

  setup() {
    const controller = this.container.TwilioController;

    this.addRoute({
      path: '/config',
      method: 'get',
      summary: 'Get NTS config API',
      description: 'Get list of TURN and STUN servers',
      tags: ['Twillio'],
      consumes: this.container.EmptySchema,
      produces: TwilioConfigDto.schema,
      responseStatus: HttpStatusCodes.OK,
      // beforeHooks: routeParams.beforeHooks,
      handler: controller.getConfig.bind(controller),
    });
  }
}
