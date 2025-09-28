import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideShiki} from '@xprng/vendor';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    provideShiki({
      themes: ['nord', 'github-light', 'github-dark'],
      langs: ['typescript', 'javascript', 'css', 'html', 'json', 'bash', 'yaml']
    }),
  ]
};
