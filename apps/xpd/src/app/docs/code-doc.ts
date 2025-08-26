import { Component, ViewEncapsulation } from "@angular/core";
import { XpdWrap } from "@xprng/docs";
import { Code } from "@xprng/code";

@Component({
  selector: "xpd-docs-code",
  imports: [Code],
  encapsulation: ViewEncapsulation.None,
  styles: `
    pre {
      padding: 1em;
    }
  `,
  template: `
    @if (content) {
      <xpr-code [content]="content" [lang]="lang"/>
    } @else if (src) {
      <xpr-code [src]="src" [lang]="lang"/>
    } @else {
      <p>No content or src provided</p>
    }

  `,
})
export default class CodeDoc extends XpdWrap {
  get content() {
    return this.prop<string>("content");
  }

  get lang() {
    return this.prop<string>("lang") ?? "javascript";
  }

  get src() {
    return this.prop<string>("src") ??
      "https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/apps/docs/public/example.js";
  }
}
