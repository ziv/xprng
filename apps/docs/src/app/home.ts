import {Component, inject} from '@angular/core';
import routes from '../docs/routes';
import {RouterLink} from '@angular/router';
import {Markdown} from '@xprng/markdown';
import { Configuration } from '@xprng/docs';

@Component({
  selector: 'xpd-home',
  imports: [
    RouterLink,
    Markdown,
  ],
  host: {
    '[style.background-color]': 'conf().secondaryColor',
  },
  styles: `
    div.home-docs-container {
      display: flex;
      gap: 1em;
      padding: 1em;
    }

    div.home-docs-footer,
    div.home-docs-header {
      padding: 1em;
    }

    button.home-docs-doc {
      border: none;
      width: 10em;
      height: 10em;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
    }

    button.home-docs-doc:hover {
      background-color: #2d4375;
    }

    button.home-docs-doc:active {
      background-color: #3e5ca1;
    }
  `,
  template: `
    <div class="home-docs-header">
      <xpr-markdown [src]="conf().homeHeader"/>
    </div>
    <div class="home-docs-container" [style.background-color]="">
      @for (item of items; track item.route) {
        <button class="home-docs-doc"
                [style.background-color]="conf().primaryColor"
                [routerLink]="item.route">{{ item.label }}
        </button>
      }
    </div>
    <div class="home-docs-footer">
      <xpr-markdown [src]="conf().homeFooter"/>
    </div>
  `,

})
export default class HomeFeature {
  conf = inject(Configuration).conf;
  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));
}
