import { Component } from "@angular/core";
import { Code } from "@xprng/code";
import { httpResource } from "@angular/common/http";

const DIRECT_USAGE = `<xpr-markdown md="..." />`;
const REMOTE_USAGE = `<xpr-markdown src="..." />`;

@Component({
  selector: "ex-markdown-example",
  imports: [
    Code,
  ],
  host: {
    class: "block w-full p-4",
  },
  template: `
    <h1>Markdown</h1>
    <hr/>
    <p>The Markdown component parse and render markdown syntax as HTML.</p>
    <h2>With direct input</h2>
    <section>
      <xpr-code lang="html" [code]="direct"/>
    </section>
    <h2>With remote resource</h2>
    <section>
      <xpr-code lang="html" [code]="remote"/>
    </section>
  `,
})
export default class MarkdownExample {
  direct = DIRECT_USAGE;
  remote = REMOTE_USAGE;
}
