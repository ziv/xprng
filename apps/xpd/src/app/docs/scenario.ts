import { Component } from "@angular/core";
import { XpdWrap } from "@xprng/docs";
import { RouterLink } from "@angular/router";

@Component({
  selector: "xpd-docs-markdown",
  imports: [
    RouterLink,
  ],
  host: {
    class: "pico",
  },
  template: `
    <h2>Scenario A</h2>
    <p>Navigation dropdown</p>
    <nav>
      <ul>
        <li><strong>Acme Corp</strong></li>
      </ul>
      <ul>
        <li><a>About</a></li>
        <li>
          <details class="dropdown">
            <summary>
              Account
            </summary>
            <ul dir="rtl">
              <li><a routerLink="/iframe/markdown">Profile</a></li>
              <li><a routerLink="/iframe/code">Settings</a></li>
              <li><a routerLink="/iframe/slides">Security</a></li>
              <li><a (click)="logout()">Logout</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  `,
})
export default class Scenario extends XpdWrap {
  logout() {
    alert("Logout");
  }
}
