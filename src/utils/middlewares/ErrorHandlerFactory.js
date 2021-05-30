import { CustomError, InternalServerError } from '../http';

export class ErrorHandlerFactory {
  static errorHandler({ config, WebLogger }) {
    return (err, req, res, next) => {

      if (!err) {
        return next();
      }

      if (res.locals.transaction && !res.locals.transaction.finished) {
        res.locals.transaction.rollback();
      }

      if (!(err instanceof CustomError)) {
        err = new InternalServerError(err.message);
      }

      let httpStatusCode = err.httpStatusCode;
      if (err.response && err.response.status) {
        httpStatusCode = err.response.status;
      }

      const error = {
        code: err.code,
        message: err.message,
        context: err.options && err.options.context,
      };

      if (!config.production) {
        error.stacktrace = err.stack && err.stack.split('\n');
      }

      WebLogger.error({ message: err });

      res
        .status(httpStatusCode)
        .json({
          __v: ErrorHandlerFactory.retrieveVersion(req),
          error,
        })
        .end();
    };
  }

  static retrieveVersion(request, version) {
    if (request.params.version) {
      version = parseInt(request.params.version.replace('v', ''));
    } else {
      version = parseInt(request.url.match(/\d+/));
    }
    return version ? version.toFixed(1) : '0.0';
  }
}
