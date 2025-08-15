import {booleanAttribute, Component, computed, inject, numberAttribute, signal} from '@angular/core';
import {ActivatedRoute, EventType, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Markdown} from '@xprng/markdown';
import {DocDescriptor, Player, Props} from '@xprng/docs';
import routes from '../docs/routes';
import {DocsHost} from './documentation-component';
import NgLogo from './nglogo';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import Navigation from './services/navigation';

function numericAttribute(value: unknown): number {
  const n = numberAttribute(value);
  return isNaN(n) ? 0 : n;
}

/**
 * # Documentation component
 * This component serves as a host for displaying documentation of various components.
 * It provides itself to allow subcomponents to access their host and update the displayed component.
 */
@Component({
  selector: 'xpd-docs',
  imports: [
    RouterOutlet,
    Player,
    Markdown,
    Props,
    RouterLink,
    RouterLinkActive,
    NgLogo,
  ],
  providers: [
    {
      provide: DocsHost,
      useExisting: Documentation,
    }
  ],
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }

    aside {
      padding: 1em 0;
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--pico-primary-background);

      xpd-nglogo {
        margin: 1em 0 2em 0;
      }

      xpd-nglogo:hover {
        cursor: pointer;
        filter: brightness(1.1);
      }

      li.xpd-nav {
        a {
          color: var(--pico-primary-inverse);
        }
      }

      li.active {
        background: var(--pico-primary-inverse);

        a {
          color: var(--pico-primary-background);
        }
      }
    }

    div.documentation-area {
      --pico-background-color: var(--pico-secondary-background);
      flex: 1;

      background: var(--pico-secondary-background);
      color: var(--pico-primary-inverse);
      height: 100%;
      display: flex;
      flex-direction: column;

      h1 {
        color: var(--pico-primary-inverse);
        font-size: calc(var(--pico-font-size) / 1.5);
        margin-bottom: 0;
      }

      div.documentation-overview {
        margin: .5em 1em;
      }
    }

    li.tab {
      padding-bottom: 0;
      padding-top: 0;
    }
  `,
  template: `
    <aside>
      <xpd-nglogo routerLink="/home" style="width: 50%"/>
      <div class="grow" style="overflow-y: auto; padding:0 1.5em;margin: 0 .5em;">
        <nav>
          <ul>
            @for (item of items; track item.route) {
              <li routerLinkActive="active" class="xpd-nav">
                <a [routerLink]="item.route" queryParamsHandling="merge">{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <button><span class="sym">routine</span></button>
      <button (click)="help()"><span class="sym">help</span></button>
      <button (click)="settings()"><span class="sym">settings</span></button>
    </aside>
    <div class="documentation-area">
      @let c = component();
      <div class="documentation-overview">
        @if (c) {
          <h1>{{ c.name }}</h1>
          @if (c.description) {
            <small>{{ c.description }}</small>
          }
        }
      </div>

      <xpd-player>
        <router-outlet/>
      </xpd-player>

      <div class="px-10">
        <nav>
          <ul>
            @for (t of tabs(); track t.value) {
              <li class="tab">
                <button [class]="t.value !== tab() ? 'secondary' : ''"
                        (click)="selectTab(t.value)"
                        [disabled]="minimized()">{{ t.label }}
                </button>
              </li>
            }
          </ul>
          @if (minimized()) {
            <button (click)="minimize(false)" class="secondary toolbar" data-tooltip="Maximize"
                    data-placement="left">
              <span class="sym">maximize</span>
            </button>
          } @else {
            <button (click)="minimize(true)" class="secondary toolbar" data-tooltip="Minimize"
                    data-placement="left">
              <span class="sym">minimize</span>
            </button>
          }
        </nav>
        @if (!minimized()) {
          @switch (tab()) {
            @case (0) {
              @if (c && c.props) {
                <xpd-props [props]="c.props"></xpd-props>
              }
            }
            @case (1) {
              @if (c && c.overview) {
                <xpr-markdown [src]="c.overview"></xpr-markdown>
              }
            }
            @default {
              <h3>Unknown tab</h3>
            }
          }
        }
      </div>

    </div>
  `,
})
export default class Documentation {
  private readonly router = inject(Router);
  private readonly navigte = inject(Navigation);
  protected readonly params = toSignal(inject(ActivatedRoute).queryParams);
  readonly component = signal<DocDescriptor | undefined>(undefined);
  readonly log = signal<unknown[]>([]);

  // lower tabs details

  protected readonly tabs = signal([
    {label: 'Properties', value: 0},
    {label: 'Overview', value: 1},
    {label: 'Source', value: 2},
  ]);
  // protected readonly tab = signal(0);
  protected readonly tabMinimized = signal(false);

  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));

  selectTab(tab: number) {
    this.navigte.merge({tab})
  }

  minimize(minimize: boolean) {
    this.navigte.merge({minimize})

  }

  settings() {
    return this.navigte.merge({settings: true});
  }

  help() {
    return this.navigte.merge({help: true});
  }


  protected readonly tab = computed(() => numericAttribute(this.url()?.searchParams.get('tab')));
  protected readonly minimized = computed(() => booleanAttribute(this.url()?.searchParams.get('minimize')) ?? false);

  private readonly url = toSignal<URL>(inject(Router).events.pipe(
    filter(e => e.type === EventType.NavigationEnd),
    map(e => new URL(e.url, 'http://localhost')),
  ));
}
