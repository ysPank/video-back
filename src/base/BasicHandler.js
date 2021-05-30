/**
 * @typedef {Object} AppRoute
 * @param {string} path
 * @param {string} method
 * @param {string} summary
 * @param {string} description
 * @param {number} responseStatus
 * @param {boolean|BaseAuth|BaseAuth[]} auth
 * @param {AppSchema} consumes
 * @param {Object} produces
 * @param {function(*)[]} beforeHooks
 * @param {function} handler
 */

export class BasicHandler {
  constructor() {
    this.routesCache = [];
  }

  get routes() { return this.routesCache; }

  setup() { return null; }

  addRoute(route) {
    this.routesCache.push(route);
  }
}
