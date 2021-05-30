import { v4 as uuid } from 'uuid';

export class RequestLoggerFactory {
  static getWriter({ WebLogger }) {
    return (req, res, next) => {
      const start = new Date();

      const request = {
        id: uuid(),
        method: req.method,
        host: req.headers.host,
        userAgent: req.headers['user-agent'],
        headers: RequestLoggerFactory.getHeaders(req.headers),
      };

      WebLogger.log('trace', `❯❯❯ ${req.method.toUpperCase()} ${req.url}`, request);

      res.on('finish', () => {
        WebLogger.log('trace', `❮❮❮ ${req.method.toUpperCase()} ${req.url}`, {
          id: request.id,
          duration: `${new Date().getTime() - start.getTime()} ms`,
          headers: RequestLoggerFactory.getHeaders(res._headers),
        });
      });

      next();
    };
  }

  static getHeaders(headers) {
    const excludeHeaders = ['cookie'];
    const cachedHeaders = Object.assign({}, headers);
    excludeHeaders.forEach(key => delete cachedHeaders[key]);
    return cachedHeaders;
  }
}
