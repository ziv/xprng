import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PlatformLocation} from '@angular/common';

type NavItem = {
  label: string;
  route: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  styles: `
    :host {
      padding: 1em;
    }

    aside {
      position: sticky;
      top: 1em;
    }
  `,
  template: `
    <aside>
      <nav>
        <ul>
          @for (item of items; track item.route) {
            <li>
              <a [routerLink]="item.route">{{ item.label }}</a>
            </li>
          }
        </ul>
      </nav>
    </aside>
    <main class="container">
      <router-outlet/>
    </main>
  `,
})
export class App {

  href = inject(PlatformLocation).getBaseHrefFromDOM()

  items: NavItem[] = [
    {
      label: 'Code Demo',
      route: '/code'
    },
    {
      label: 'Markdown Demo',
      route: '/markdown'
    },
    {
      label: 'Slides Demo',
      route: '/slides'
    }
  ];
}
