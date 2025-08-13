import { Component } from '@angular/core';
import {Markdown} from '@xprng/markdown';

@Component({
  selector: 'xpd-markdown',
  imports: [Markdown],
  template: `
    <h1>Markdown</h1>
    <p>Load markdown from "/example.md" and display it.</p>
    <xpr-markdown src="/example.md"/>
  `,
  styles: ``
})
export default class MarkdownFeature {
}
