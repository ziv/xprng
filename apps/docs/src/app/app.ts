import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import routes from '../docs/routes';

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet, RouterLink],
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
      <router-outlet/>
    </main>
  `,
})
export class App {
  readonly items = routes.map(route => ({
    label: route.title,
    route: `/docs/${route.path}`,
  }));
}
