import { Component } from "@angular/core";
import { Code } from "@xprng/code";

@Component({
  selector: "ex-code-example",
  imports: [Code],
  template: `
    <h1>Code Highlighter example</h1>
    <hr/>
    <xpr-code [code]="code"/>
  `,
})
export default class CodeExample {
  code = `
  import {Component} from '@angular/core';
  import {Markdown} from '@xprng/markdown';

  const foo = ['bar', 'baz'];
  `;
}
