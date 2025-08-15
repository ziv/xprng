import {map} from 'rxjs';
import {Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Markdown} from '@xprng/markdown';
import {DocDescriptor, Player, Props} from '@xprng/docs';
import routes from '../docs/routes';
import {DocsHost} from './documentation-component';
import NgLogo from './nglogo';

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
      useExisting: Docs,
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
      <xpd-nglogo routerLink="/home" size="100" />
      <nav>
        <ul>
          @for (item of items; track item.route) {
            <li routerLinkActive="active" class="xpd-nav">
              <a [routerLink]="item.route">{{ item.label }}</a>
            </li>
          }
        </ul>
      </nav>
      <span style="flex:1"></span>
      <nav>
        <ul>
          <li class="xpd-nav">
            <a (click)="help()">Help</a>
          </li>
          <li class="xpd-nav">
            <a (click)="settings()">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="documentation-area">
      @let c = component();
      <div class="documentation-overview">
        @if (c) {
          <h1>{{ c.name }}</h1>
          @if (c.description) {
            <small>{{ c.description }}</small>
          }
          <!--          @if (c.overview) {-->
            <!--            <div>-->
            <!--              <xpr-markdown [src]="c.overview"></xpr-markdown>-->
            <!--            </div>-->
            <!--          }-->
        }
      </div>

      <xpd-player>
        <router-outlet/>
      </xpd-player>

      <div>
        <nav>
          <ul>
            @for (t of tabs(); track t.value) {
              @if (t.value === tab()) {
                <li class="tab">
                  <button (click)="tab.set(t.value)">{{ t.label }}</button>
                </li>
              } @else {
                <li class="tab">
                  <button class="secondary" (click)="tab.set(t.value)">{{ t.label }}</button>
                </li>
              }
            }
          </ul>
        </nav>
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
      </div>

    </div>
  `,
})
export default class Docs {
  private readonly router = inject(Router);
  readonly component = signal<DocDescriptor | undefined>(undefined);
  readonly log = signal<unknown[]>([]);

  protected readonly routeDescriptor = toSignal(inject(ActivatedRoute).data.pipe(map(data => data['component'] as DocDescriptor)));


  protected readonly tabs = signal([
    {label: 'Properties', value: 0},
    {label: 'Overview', value: 1},
    {label: 'Source', value: 2},
  ]);
  protected readonly tab = signal(0);

  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));

  settings() {
    return this.router.navigate([], {
      queryParams: {settings: true},
      queryParamsHandling: 'merge',
    });
  }

  help() {
    return this.router.navigate([], {
      queryParams: {help: true},
      queryParamsHandling: 'replace',
    });
  }
}
