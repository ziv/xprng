import {mergeApplicationConfig, ApplicationConfig} from '@angular/core';
import {provideServerRendering, withRoutes} from '@angular/ssr';
import Config from './app.config';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export default mergeApplicationConfig(Config, serverConfig);
