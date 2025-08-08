import { Component, input } from "@angular/core";
import { EmptyState, LoadingState } from "@xprng/common";

@Component({
  selector: "ex-stam",
  imports: [],
  template: `
    <p>Stam</p>
    @if (x()) {
      <ng-content select="xpr-empty-state"></ng-content>
    } @else {
      <ng-content select="xpr-loading-state"></ng-content>
    }
    <p>End</p>
  `,
})
export class Stam {
  x = input<string | undefined>();
}

@Component({
  selector: "ex-code-example",
  imports: [
    Stam,
    LoadingState,
    EmptyState,
  ],
  template: `
    <h1>Free Coding</h1>
    <hr/>
    <ex-stam>
      <xpr-loading-state>xxx</xpr-loading-state>
      <xpr-empty-state>yyy</xpr-empty-state>
    </ex-stam>
  `,
})
export default class Free {
}
