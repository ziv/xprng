import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

type NavItem = {
  label: string;
  route: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
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
