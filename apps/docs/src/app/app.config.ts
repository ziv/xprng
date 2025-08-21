import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withViewTransitions} from '@angular/router';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideConfig, routesToNavigation} from '@xprng/docs';

import {routes} from './app.routes';
import docsRoutes from '../docs/routes';
import descriptors from '../docs/descriptors';

export default {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),

    // @xprng/docs items:
    provideConfig({
      descriptors,
      // iframe: 'https://xprng.github.io/docs/iframe/',
      iframe: 'http://localhost:4200/iframe/',
      logo: 'logosh.svg',
      help: '',
      navigation: routesToNavigation(docsRoutes),
    }),
  ]
} as ApplicationConfig;
