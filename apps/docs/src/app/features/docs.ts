import {Component, inject, InjectionToken, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import Player from '../shared/player';
import {DocDescriptor} from '../shared/descriptor';
import {Markdown} from '@xprng/markdown';
import Props from '../shared/props';

export const DocsHost = new InjectionToken('DocsHost');

@Component({
  selector: 'xpd-docs',
  imports: [
    RouterOutlet,
    Player,
    Markdown,
    Props,
  ],
  providers: [
    {
      provide: DocsHost,
      useExisting: Docs,
    }
  ],
  styles: `
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `,
  template: `
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

  `,
})
export default class Docs {
  readonly router = inject(Router);

  readonly component = signal<DocDescriptor<any> | undefined>(undefined);
}
