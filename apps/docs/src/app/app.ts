import {booleanAttribute, Component, computed, inject, InjectionToken} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Settings} from '@xprng/docs'

export const AppAccess = new InjectionToken('AppAccess');

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet, Settings],
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
          <xpd-settings/>
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
          <!-- todo the help will come from remote content -->
          <h5>About</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.</p>

          <h5>Keyboard Shortcuts</h5>
          <table>
            <tr>
              <td>
                <kbd>⌘ S</kbd>
              </td>
              <td>Open settings</td>
            </tr>
            <tr>
              <td>
                <kbd>⌘ H</kbd>
              </td>
              <td>Open help</td>
            </tr>
            <tr>
              <td>
                <kbd>Esc</kbd>
              </td>
              <td>Close dialogs</td>
          </table>
        </article>
      </dialog>
    }
    <router-outlet/>
  `,
})
export class App {
  private readonly router = inject(Router);
  private readonly query = toSignal(inject(ActivatedRoute).queryParams);

  protected readonly showSettings = computed(() => booleanAttribute(this.query()?.['settings']));
  protected readonly showHelp = computed(() => booleanAttribute(this.query()?.['help']));

  open(name: 'settings' | 'help', e?: Event) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.router.navigate([], {
      queryParams: {[name]: true},
      queryParamsHandling: 'replace',
    }).catch(console.error);
  }

  clear() {
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: 'replace',
    }).catch(console.error);
  }
}
