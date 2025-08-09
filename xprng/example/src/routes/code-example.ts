import { Component } from "@angular/core";
import { Code } from "@xprng/code";

const DIRECT_USAGE = `<xpr-code md="..." />`
const REMOTE_USAGE = `<xpr-code src="..." />`

@Component({
  selector: "ex-code-example",
  imports: [Code],
  host: {
    class: "block w-full p-4",
  },
  template: `
    <h1>Markdown</h1>
    <hr/>
    <p>The Code component highlights source code.</p>
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
export default class CodeExample {
  direct = DIRECT_USAGE;
  remote = REMOTE_USAGE;
}
