import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation, withViewTransitions} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideConfig, provideDescriptors, provideRoutes, routesToNavigation} from '@xprng/docs';
import {routes} from './app.routes';
import docsRoutes from './docs/routes';
import descriptors from './docs/descriptors';

export default {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes, withHashLocation(), withViewTransitions()),
        provideHttpClient(withFetch()),

        // @xprng/docs items:
        provideDescriptors(descriptors),
        provideRoutes(docsRoutes),
        provideConfig({
            logo: 'logosh.svg',
            help: 'help.md',
            navigation: routesToNavigation(docsRoutes),
        }),
    ]
} as ApplicationConfig;
