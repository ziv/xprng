import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {CONFIGURATION_TOKEN} from '@xprng/docs';
import {ROUTES_TOKEN} from './services/configuration';
import docsRoutes from '../docs/routes';

export default {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    // todo replace with provide function
    {
      provide: CONFIGURATION_TOKEN,
      useValue: {
        primaryColor: '#6491ff',
        secondaryColor: '#a6e162',
        homeHeader: '/internal/home-header.md',
        homeFooter: '/internal/home-footer.md',
      },
    },
    {
      provide: ROUTES_TOKEN,
      useValue: docsRoutes
    }
  ]
} as ApplicationConfig;
