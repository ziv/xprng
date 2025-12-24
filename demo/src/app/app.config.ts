import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideShiki} from '@xprng/vendor';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideHttpClient(withFetch()),

    provideShiki({
      themes: ['nord', 'github-light', 'github-dark', 'catppuccin-latte'],
      langs: ['typescript', 'javascript', 'css', 'html', 'json', 'bash', 'yaml']
    }),
  ]
};
