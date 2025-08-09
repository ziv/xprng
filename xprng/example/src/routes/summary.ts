import { Component } from "@angular/core";
import { Code } from "@xprng/code";

const DIRECT_USAGE = `<xpr-code md="..." />`;
const REMOTE_USAGE = `<xpr-code src="..." />`;

@Component({
  selector: "ex-code-example",
  host: {
    class: "block w-full p-4",
  },
  template: `
    <h1>XPRNG</h1>
    <p>Micro packages of very simple - but high quality - smart components.</p>

  `,
})
export default class Summary {
}
