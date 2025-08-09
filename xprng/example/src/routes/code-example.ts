import { Component } from "@angular/core";
import { Code } from "@xprng/code";

const DIRECT_USAGE = `<xpr-code md="..." />`;
const REMOTE_USAGE = `<xpr-code src="..." />`;
const EXAMPLE_CODE = `
class Foo {
  bar(i: number): string {
    return \`Bar: \${i}\`;
  }
}
`;

@Component({
  selector: "ex-code-example",
  imports: [Code],
  host: {
    class: "block w-full p-4",
  },
  template: `
    <h1>Code</h1>
    <hr/>
    <p>The Code component highlights source code.</p>
    <h2>Usage</h2>
    <h3>With direct input</h3>
    <article class="pb-6">
      <section>
        <xpr-code lang="html" [code]="direct"/>
      </section>
      <h3>With remote resource</h3>
      <section>
        <xpr-code lang="html" [code]="remote"/>
      </section>
    </article>


    <h2>Example</h2>
    <p>Typescript</p>
    <section>
      <xpr-code lang="typescript" [code]="example"/>
    </section>
  `,
})
export default class CodeExample {
  direct = DIRECT_USAGE;
  remote = REMOTE_USAGE;
  example = EXAMPLE_CODE;
}
