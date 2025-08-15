import {inject, Injectable} from '@angular/core';
import Navigation from './navigation';

function clear(e?: Event) {
  if (!e) {
    return;
  }
  e.stopPropagation();
  e.preventDefault();
}

@Injectable({providedIn: 'root'})
export default class Dialogs {
  private readonly nav = inject(Navigation);

  help(e?: Event) {
    clear(e);
    this.nav.merge({help: true});
  }

  settings(e?: Event) {
    clear(e);
    this.nav.merge({settings: true});
  }

  clear(e?: Event) {
    clear(e);
    this.nav.merge({settings: false, help: false});
  }
}
