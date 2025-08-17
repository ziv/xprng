import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withViewTransitions} from '@angular/router';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {ROUTES_TOKEN, CONFIGURATION_TOKEN} from '@xprng/docs';

import {routes} from './app.routes';
import docsRoutes from '../docs/routes';
import {provideDescriptors} from '@xprng/docs';
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
    // todo replace with provide function
    // {
    //   provide: CONFIGURATION_TOKEN,
    //   useValue: {
    //     primaryColor: '#6491ff',
    //     secondaryColor: '#a6e162',
    //     homeHeader: '/internal/home-header.md',
    //     homeFooter: '/internal/home-footer.md',
    //   },
    // },
    {
      provide: ROUTES_TOKEN,
      useValue: docsRoutes
    }
  ]
} as ApplicationConfig;
