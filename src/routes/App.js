import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from 'config';
import * as swagger from 'swagger-ui-express';
import { RoutesInjector } from '../utils/routesInjector/RoutesInjector';

export class App {
  constructor(container) {
    this.container = container;

    const application = express();
    application.use(bodyParser.json({ limit: '50mb' }));
    application.use(bodyParser.urlencoded({ limit: '50mb' }));
    application.use(cors());
    application.use(this.container.resolve('RequestLogger'));
    application.use(this.container.resolve('TimeoutCounter'));

    const appBuilder = this.container.resolve('AppBuilder');
    appBuilder.API_URL = '/api';

    RoutesInjector.registerRoutes(this.container, appBuilder);

    application.use(appBuilder.router);

    if (true !== config.get('production')) {
      application.use('/swagger', swagger.serve, swagger.setup(appBuilder.getDocs()));
    }

    application.use(this.container.resolve('ErrorHandler'));

    return application;
  }
}
