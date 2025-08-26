import { Component } from "@angular/core";
import { Markdown } from "@xprng/markdown";
import { XpdWrap } from "@xprng/docs";
import { ErrorState } from "@xprng/common";

@Component({
  selector: "xpd-docs-markdown",
  imports: [Markdown, ErrorState],
  template: `
    @if (content) {
      <xpr-markdown [content]="content"/>
    } @else if (src) {
      <xpr-markdown [src]="src">
        <xpr-error-state>Error loading markdown from "{{ src }}"</xpr-error-state>
      </xpr-markdown>
    } @else {
      <p>No content or src provided for MarkdownDoc component.</p>
    }
  `,
})
export default class MarkdownDoc extends XpdWrap {
  get content() {
    return this.prop<string>("content");
  }

  get src() {
    return this.prop<string>("src") ?? "https://ziv.github.io/xprng/example.md";
  }
}
