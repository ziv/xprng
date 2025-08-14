import {Component, InjectionToken, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import Player from '../shared/player';
import {DocDescriptor} from '../shared/descriptor';
import {Markdown} from '@xprng/markdown';
import Props from '../shared/props';
import routes from '../../docs/routes';

export const DocsHost = new InjectionToken('DocsHost');

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
      width: 20%;
      background: #a6e162;
    }

    main {
      flex: 1;
      background: #6491ff;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `,
  template: `
    <aside>
      <nav>
        <a routerLink="/home">Home</a>
        @for (item of items; track item.route) {
          <a [routerLink]="item.route">{{ item.label }}</a>
        }
      </nav>
    </aside>
    <main>
      @let c = component();
      @if (c) {
        <h1>{{ c.name }}</h1>
        @if (c.description) {
          <p>{{ c.description }}</p>
        }
        @if (c.overview) {
          <div>
            <xpr-markdown [src]="c.overview"></xpr-markdown>
          </div>
        }
      }

      <xpd-player>
        <router-outlet/>
      </xpd-player>

      @if (c && c.props) {
        <xpd-props [props]="c.props"></xpd-props>
      }
    </main>
  `,
})
export default class Docs {
  readonly component = signal<DocDescriptor | undefined>(undefined);

  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));
}
