import {booleanAttribute, Component, computed, inject} from '@angular/core';
import Navigation from '../services/navigation';
import {Markdown} from '@xprng/markdown';
import {PlatformLocation} from '@angular/common';

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
            <button aria-label="Close" rel="prev" (click)="nav.merge({help: false})"></button>
            <h4>Help</h4>
            <p>Help for yet another documentation app</p>
          </header>
          <xpr-markdown [src]="src"/>
        </article>
      </dialog>
    }
  `
})
export default class HelpDialog {
  protected src = inject(PlatformLocation).getBaseHrefFromDOM() + 'internal/help.md';
  protected readonly nav = inject(Navigation);
  protected readonly show = computed(() => booleanAttribute(this.nav.param('help')));
}
