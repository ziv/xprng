import {Component} from '@angular/core';
import routes from '../../docs/routes';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'xpd-home',
  imports: [
    RouterLink
  ],
  styles: `
    div.home-docs-container {
      display: flex;
      gap: 1em;
      padding: 1em;
    }

    button.home-docs-doc {
      border: none;
      width: 10em;
      height: 10em;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #213156;
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
    <div class="home-docs-container">
      @for (item of items; track item.route) {
        <button class="home-docs-doc" [routerLink]="item.route">{{ item.label }}</button>
      }
    </div>
  `,

})
export default class HomeFeature {
  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));
}
