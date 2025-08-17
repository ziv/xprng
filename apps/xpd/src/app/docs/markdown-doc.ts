import {Component} from '@angular/core';
import {Markdown} from '@xprng/markdown';
import {XpdWrap} from '@xprng/docs';

@Component({
  selector: 'xpd-docs-markdown',
  imports: [Markdown],
  template: `
    @if (content) {
      <xpr-markdown [content]="content"/>
    } @else if (src) {
      <xpr-markdown [src]="src"/>
    } @else {<p>No content or src provided for MarkdownDoc component.</p>}
  `,
})
export default class MarkdownDoc extends XpdWrap {

  get content() {
    return this.prop<string>('content');
  }

  get src() {
    return this.prop<string>('src') ?? 'https://ziv.github.io/xprng/example.md';
  }
}
