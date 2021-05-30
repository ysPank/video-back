import { BasicHandler } from './BasicHandler';
import { HttpStatusCodes } from '../constants/statusCodes';

export default class BaseCRUD extends BasicHandler {

  addCreateInstanceRoute(routeParams) {
    this.addRoute({
      path: '/',
      method: 'post',
      summary: `Create ${routeParams.modelName} API `,
      description: `Create new ${routeParams.modelName} instance`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.Created,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.create.bind(routeParams.controller),
    });
  }

  addUpdateMeInstanceRoute(routeParams) {
    this.addRoute({
      path: '/me',
      method: 'put',
      summary: `Update ${routeParams.modelName} API `,
      description: `Update ${routeParams.modelName} instance`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.Created,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.updateMyInstance.bind(routeParams.controller),
    });
  }

  addUpdateInstanceRoute(routeParams) {
    this.addRoute({
      path: '/:id',
      method: 'put',
      summary: `Update ${routeParams.modelName} API`,
      description: `Update ${routeParams.modelName} instance by id`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.update.bind(routeParams.controller),
    });
  }

  addUpdateInstanceByLocalIdRoute(routeParams) {
    this.addRoute({
      path: '/:localId',
      method: 'put',
      summary: `Update ${routeParams.modelName} API`,
      description: `Update ${routeParams.modelName} instance by local ID`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.update.bind(routeParams.controller),
    });
  }

  addGetInstanceByIdRoute(routeParams) {
    this.addRoute({
      path: '/:id',
      method: 'get',
      summary: `Get ${routeParams.modelName} by id API`,
      description: `Get ${routeParams.modelName} by id API`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.getById.bind(routeParams.controller),
    });
  }

  addGetMyInstanceRoute(routeParams) {
    this.addRoute({
      path: '/me',
      method: 'get',
      summary: `Get ${routeParams.modelName} API`,
      description: `Get ${routeParams.modelName} API`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.getMyEntity.bind(routeParams.controller),
    });
  }

  addGetMyInstancesListRoute(routeParams) {
    this.addRoute({
      path: '/me',
      method: 'get',
      summary: `Get my ${routeParams.modelName}s list  API`,
      description: `Get my ${routeParams.modelName}s list  API`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.getMyList.bind(routeParams.controller),
    });
  }

  addGetEntitiesListRoute(routeParams) {
    this.addRoute({
      path: '/',
      method: 'get',
      summary: `Get ${routeParams.modelName}s list API`,
      description: `Get ${routeParams.modelName} list API`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.getList.bind(routeParams.controller),
    });
  }

  addDeleteEntityRoute(routeParams) {
    this.addRoute({
      path: '/:id',
      method: 'delete',
      summary: `Delete ${routeParams.modelName} by id API`,
      description: `Delete ${routeParams.modelName} by id API`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.NoContent,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.deleteEntity.bind(routeParams.controller),
    });
  }

  addDeleteEntityByLocalIdRoute(routeParams) {
    this.addRoute({
      path: '/:localId',
      method: 'delete',
      summary: `Delete ${routeParams.modelName} by local ID API`,
      description: `Delete ${routeParams.modelName} by local ID API`,
      tags: [`${routeParams.modelName}s`],
      consumes: routeParams.consumeSchema,
      produces: routeParams.responseSchema,
      auth: routeParams.auth,
      responseStatus: HttpStatusCodes.OK,
      beforeHooks: routeParams.beforeHooks,
      handler: routeParams.controller.deleteEntityByLocalId.bind(routeParams.controller),
    });
  }
}
