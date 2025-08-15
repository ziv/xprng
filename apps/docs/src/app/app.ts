import {booleanAttribute, Component, computed, inject, InjectionToken} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Settings} from '@xprng/docs'
import {Markdown} from '@xprng/markdown';
import Navigation from './services/navigation';

export const AppAccess = new InjectionToken('AppAccess');

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet, Settings, Markdown],
  providers: [
    {
      provide: AppAccess,
      useExisting: App,
    }
  ],
  host: {
    '(document:keydown.meta.s)': 'open("settings", $event)',
    '(document:keydown.meta.h)': 'open("help", $event)',
    '(document:keydown.Esc)': 'clear()',
  },
  template: `
    @if (showSettings()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="clear()"></button>
            <h4>Settings</h4>
          </header>
          <xpd-settings></xpd-settings>
        </article>
      </dialog>
    }
    @if (showHelp()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="clear()"></button>
            <h4>Help</h4>
            <p>Help for yet another documentation app</p>
          </header>
          <xpr-markdown src="/internal/help.md"/>
        </article>
      </dialog>
    }
    <router-outlet/>
  `,
})
export default class App {
  private readonly router = inject(Router);
  private readonly nav = inject(Navigation);
  private readonly query = toSignal(inject(ActivatedRoute).queryParams);

  protected readonly showSettings = computed(() => booleanAttribute(this.query()?.['settings']));
  protected readonly showHelp = computed(() => booleanAttribute(this.query()?.['help']));

  open(name: 'settings' | 'help', e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.nav.merge(name, true);
  }

  clear() {
    this.nav.merge({settings: false, help: false});
  }
}
