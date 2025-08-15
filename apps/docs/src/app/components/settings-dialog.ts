import {Component, computed, inject} from '@angular/core';
import XpdNavigation from '../services/navigation';

@Component({
  selector: 'xpd-settings-dialog',
  imports: [],
  template: `
    @if (show()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="nav.merge({settings: false})"></button>
            <h4>Settings</h4>
          </header>
          <p>Settings comes here....</p>
        </article>
      </dialog>
    }
  `
})
export default class XpdSettingsDialog {
  protected readonly nav = inject(XpdNavigation);
  protected readonly show = computed(() => this.nav.booleanParam('settings'));
}
