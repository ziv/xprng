import { Component } from "@angular/core";
import { Code, Highlighter } from "@xprng/highlighter";

@Component({
  selector: "ex-code-example",
  imports: [
    Highlighter,
    Code,
  ],
  template: `
    <h1>Code/Highlighter example</h1>
    <hr/>
    ss
    <div>
      <xpr-highlighter language="javascript" [code]="code"></xpr-highlighter>
    </div>
    vv
    <div>
      <xpr-code>
        <template lang="javascript">

 import Component from '@angular/core';
 const x = new Date();
        </template>
      </xpr-code>
    </div>
  `,
})
export default class CodeExample {
  code = `
  import {Component} from '@angular/core';
  import {Markdown, MarkdownError, MarkdownLoading} from '@xprng/markdown';
  `;

  ngOnInit() {
  }
}
