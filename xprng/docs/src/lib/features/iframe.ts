import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "xpd-iframe",
  imports: [
    RouterOutlet,
  ],
  styles: `
    :host {
      height: 100%;
      width: 100%;
      display: flex;
      padding: 1em;
      justify-content: center;
      align-items: center;
    }
  `,
  template: "<router-outlet />",
})
export class XpdIframe {
}
