/**
 * @typedef {Object} AppBuilder
 */

export class RoutesInjector {
  static registerRoutes(container, appBuilder) {
    if (!container.cradle.routesScope.length) return;

    container.cradle.routesScope.forEach((item) => {
      const resolver = container.resolve(item);
      appBuilder.registerRoutes(resolver.apiRoot, resolver);
    });
  }
}
