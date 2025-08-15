import {bootstrapApplication} from '@angular/platform-browser';
import Config from './app/app.config';
import App from './app/app';

bootstrapApplication(App, Config).catch((err) => console.error(err));
