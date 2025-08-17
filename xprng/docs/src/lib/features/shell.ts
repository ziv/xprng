import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "xpd-shell",
  imports: [RouterOutlet],
  template: "<router-outlet/>",
})
export class XpdShell {
}
