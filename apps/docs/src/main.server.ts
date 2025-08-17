import {bootstrapApplication} from '@angular/platform-browser';
import {XpdShell} from '@xprng/docs';
import Config from './app/app.config.server';

const bootstrap = () => bootstrapApplication(XpdShell, Config);

export default bootstrap;
