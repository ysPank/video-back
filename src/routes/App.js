import express from 'express';
import cors from 'cors';
import config from 'config';
import * as swagger from 'swagger-ui-express';

import { RoutesInjector } from '../utils/routesInjector/RoutesInjector';
import { API_URL } from '../constants';

export class App {
  constructor(container) {
    this.container = container;

    const application = express();
    application.use(express.json({ limit: '50mb' }));
    application.use(express.urlencoded({ limit: '50mb' }));
    application.use(cors());
    application.use(this.container.resolve('RequestLogger'));
    application.use(this.container.resolve('TimeoutCounter'));

    const appBuilder = this.container.resolve('AppBuilder');
    appBuilder.API_URL = API_URL;

    RoutesInjector.registerRoutes(this.container, appBuilder);

    application.use(appBuilder.router);

    if (true !== config.get('production')) {
      application.use('/swagger', swagger.serve, swagger.setup(appBuilder.getDocs()));
    }

    application.use(this.container.resolve('ErrorHandler'));

    return application;
  }
}
