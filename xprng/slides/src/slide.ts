import { Component, model } from "@angular/core";

@Component({
  selector: "xpr-slide",
  imports: [],
  template: `
    @if (display()) {
      <ng-content/>
    }
  `,
})
export class Slide {
  readonly display = model<boolean>(false);

  show() {
    this.display.set(true);
  }

  hide() {
    this.display.set(false);
  }
}
