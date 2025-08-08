import { Component, OnInit, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  template: `
    <aside>
      <ul>
        <li>
          <a routerLink="/">Home</a>
        </li>
        <li>
          <a routerLink="/markdown">Markdown</a>
        </li>
        <li>
          <a routerLink="/highlighter">Highlighter</a>
        </li>
      </ul>
    </aside>
    <main>
      <router-outlet/>
    </main>
  `,
})
export class App implements OnInit {
  protected readonly title = signal("example");

  async ngOnInit() {
  }
}
