import {Component} from '@angular/core';
import routes from '../docs/routes';
import {RouterLink} from '@angular/router';
import NgLogo from './nglogo';

@Component({
  selector: 'xpd-home',
  imports: [
    RouterLink,
    NgLogo,
  ],
  host: {
    class: 'row'
  },
  styles: `
    aside {
      height: 100vh;
      background-color: var(--pico-primary-background);

      xpd-nglogo {
        width: 60%;
      }
    }
  `,
  template: `
    <main class="grow col">
      <div class="row g-10 m-10" style="flex-wrap: wrap;">
        @for (item of items; track item.route) {
          <button [routerLink]="item.route">{{ item.label }}</button>
        }
      </div>
      <p class="m-10">Yet Another Documentation Tool</p>
      <p class="m-10"><small>Made with ❤️</small></p>
    </main>
    <aside class="row centered grow">
      <xpd-nglogo/>
    </aside>
  `,

})
export default class HomeFeature {
  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));
}
