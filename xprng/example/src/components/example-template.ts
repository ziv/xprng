import { Component, computed, Directive, input } from "@angular/core";
import { Code } from "@xprng/code";

@Directive({
  selector: "example-title",
  host: {
    class: "block",
  },
})
export class ExampleTitle {
}

@Directive({
  selector: "example-desc",
  host: {
    class: "block",
  },
})
export class ExampleDescription {
}

@Component({
  selector: "example-template",
  imports: [],
  host: {
    class: "block",
  },
  template: `
    <div class="px-4">
      <h1>
        <ng-content select="example-title"></ng-content>
      </h1>
      <hr/>
      <section class="my-4">
        <ng-content select="example-desc"></ng-content>
      </section>
      <section class="my-4">
        <h3>Usage</h3>
        <!--        <xpr-code [code]="code()" [options]="opts()"/>-->
      </section>
      <section>
        <h3>Output</h3>
        <ng-content></ng-content>
      </section>
    </div>
  `,
})
export default class ExampleTemplate {
  // readonly code = input.required<string>();
  //
  // protected readonly opts = computed(() => {
  //   return {
  //     highlighter: shiki,
  //     theme: "github-light",
  //     lang: "html",
  //   };
  // });
}
