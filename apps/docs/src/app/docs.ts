import {map} from 'rxjs';
import {Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Markdown} from '@xprng/markdown';
import {DocDescriptor, Player, Props} from '@xprng/docs';
import routes from '../docs/routes';
import {DocsHost} from './documentation-component';

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

    button.active {
      background-color: red;
    }

    aside {
      padding: 1em 0;
      width: 20%;
      background: #a6e162;
      display: flex;
      flex-direction: column;
      align-items: center;

      li.active {
        background: #6491ff;

        a {
          color: white;
        }
      }
    }

    div.documentation-area {
      flex: 1;
      background: #6491ff;
      height: 100%;
      display: flex;
      flex-direction: column;

      div.documentation-overview {
        margin: .5em 1em;

        h1 {
          color: white;
        }
      }
    }
  `,
  template: `
    <aside>
      <nav>
        <ul>
          <li>
            <a routerLink="/home">Home</a>
          </li>
          @for (item of items; track item.route) {
            <li routerLinkActive="active">
              <a [routerLink]="item.route">{{ item.label }}</a>
            </li>
          }
        </ul>
      </nav>
      <span style="flex:1"></span>
      <nav>
        <ul>
          <li>
            <a (click)="help()">Help</a>
          </li>
          <li>
            <a (click)="settings()">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="documentation-area">
      @let c = component();
      <div class="documentation-overview">
        @if (c) {
          <h2>{{ c.name }}</h2>
          @if (c.description) {
            <div>{{ c.description }}</div>
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
        @for (t of tabs(); track t.value) {
          @if (t.value === tab()) {
            <button (click)="tab.set(t.value)" class="active">{{ t.label }}</button>
          } @else {
            <button (click)="tab.set(t.value)">{{ t.label }}</button>
          }
        }
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
