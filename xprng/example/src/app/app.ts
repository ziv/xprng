import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <aside>
      <ul class="m-4">
        @for (item of menu; track item.route) {
          <li>
            <a routerLinkActive
               [routerLink]="item.route"
               [routerLinkActiveOptions]="{ exact: true }">{{ item.label }}</a>
          </li>
        }
      </ul>
    </aside>
    <main>
      <router-outlet/>
    </main>
  `,
})
export class App {
  menu = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Markdown",
      route: "/markdown",
    },
    {
      label: "Highlighter",
      route: "/highlighter",
    },
  ];
}
