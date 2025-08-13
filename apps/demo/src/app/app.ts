import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

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
      padding: 1rem;
    }
  `,
  template: `
    <aside>
      <nav>
        @for (item of items; track item.route) {
          <button [routerLink]="item.route">{{ item.label }}</button>
        }
      </nav>
    </aside>
    <main>
      <router-outlet/>
    </main>

  `,
})
export class App {
  items = [
    {
      label: 'Home',
      route: '/home'
    },
    {
      label: 'Code',
      route: '/code'
    },
    {
      label: 'Markdown',
      route: '/markdown'
    },
    {
      label: 'Slides',
      route: '/slides'
    }
  ];
}
