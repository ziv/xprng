import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideConfig, routesToNavigation} from '@xprng/docs';
import {routes} from './app.routes';
import docsRoutes from './docs/routes';
import descriptors from './docs/descriptors';

export default {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch()),

    // @xprng/docs items:
    provideConfig({
      descriptors,
      iframe: 'http://localhost:4200',
      // iframe: 'https://ziv.github.io/xprng',
      logo: 'logosh.svg',
      help: 'help.md',
      navigation: routesToNavigation(docsRoutes),
    }),
  ]
} as ApplicationConfig;
