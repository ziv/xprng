import {bootstrapApplication} from '@angular/platform-browser';
import App from './app/app';
import Config from './app/app.config.server';

const bootstrap = () => bootstrapApplication(App, Config);

export default bootstrap;
