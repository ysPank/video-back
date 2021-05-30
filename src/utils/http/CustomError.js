export class CustomError extends Error {
  constructor(httpStatusCode, code, message, options) {
    super();
    this.httpStatusCode = httpStatusCode;
    this.code = code;
    this.message = message;
    this.options = options;
  }
}
