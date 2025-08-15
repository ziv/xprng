import {Component, computed, inject} from '@angular/core';
import XpdNavigation from '../services/navigation';
import {Markdown} from '@xprng/markdown';
import {XpdConfiguration} from '../services/configuration';

@Component({
  selector: 'xpd-help-dialog',
  imports: [
    Markdown
  ],
  template: `
    @if (show()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="nav.merge('help', false)"></button>
            <h4>Help</h4>
            <p>Help for yet another documentation app</p>
          </header>
          <xpr-markdown [src]="src"/>
        </article>
      </dialog>
    }
  `
})
export default class XpdHelpDialog {
  protected readonly src = inject(XpdConfiguration).help;
  protected readonly nav = inject(XpdNavigation);
  protected readonly show = computed(() => this.nav.booleanParam('help'));
}
