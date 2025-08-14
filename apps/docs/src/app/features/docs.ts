import {Component, InjectionToken, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import Player from '../shared/player';
import {DocDescriptor} from '../shared/descriptor';
import {Markdown} from '@xprng/markdown';
import Props from '../shared/props';

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
  readonly component = signal<DocDescriptor | undefined>(undefined);
}
