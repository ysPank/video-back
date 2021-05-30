export class RouteParams {
  constructor(
    consumeSchema,
    responseSchema,
    controller,
    modelName,
    auth = false,
    beforeHooks = [],
  ) {
    this.consumeSchema = consumeSchema;
    this.responseSchema = responseSchema;
    this.controller = controller;
    this.modelName = modelName;
    this.auth = auth;
    this.beforeHooks = beforeHooks;
  }
}
