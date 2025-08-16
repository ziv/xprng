import {bootstrapApplication} from '@angular/platform-browser';
import Config from './app/app.config';
import {App} from '@xprng/docs';

bootstrapApplication(App, Config).catch((err) => console.error(err));
