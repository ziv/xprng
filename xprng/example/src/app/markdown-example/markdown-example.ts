import { Component } from "@angular/core";
import { Markdown, MarkdownError, MarkdownLoading } from "@xprng/markdown";

@Component({
  selector: "ex-markdown-example",
  imports: [
    Markdown,
    MarkdownError,
    MarkdownLoading,
  ],
  host: {
    class: "block w-full p-4",
  },
  template: `
    <h1>Markdown example</h1>
    <hr/>
    <p>The example is using this repository readme.</p>
    <code>
      &lt;xpr-markdown src="https://raw...../README.md"/&gt;
    </code>
    <article>
      <xpr-markdown src="https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/README.md">
        <xpr-markdown-error>error</xpr-markdown-error>
        <xpr-markdown-loading>loading</xpr-markdown-loading>
      </xpr-markdown>
    </article>
  `,
  styles: ``,
})
export default class MarkdownExample {
}
