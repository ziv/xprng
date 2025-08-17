import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withViewTransitions} from '@angular/router';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideConfig, provideDescriptors, provideRoutes, routesToNavigation} from '@xprng/docs';

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
    provideDescriptors(descriptors),
    provideRoutes(docsRoutes),
    provideConfig({
      help: '',
      navigation: routesToNavigation(docsRoutes),
    }),
  ]
} as ApplicationConfig;
