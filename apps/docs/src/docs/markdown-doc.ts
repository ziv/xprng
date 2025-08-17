import {Component} from '@angular/core';
import {Markdown} from '@xprng/markdown';
import {XpdDocumentationComponent} from '@xprng/docs';

console.log(Markdown);
@Component({
  selector: 'xpd-docs-markdown',
  imports: [Markdown],
  template: `
    @if (src) {
      <xpr-markdown [src]="src"/>
    } @else if (content) {
      <xpr-markdown [content]="content"/>
    } @else {
      <p>No content or src provided for MarkdownDoc component.</p>
    }
  `,
})
export default class MarkdownDoc extends XpdDocumentationComponent {

  get content() {
    return this.prop('content');
  }

  get src() {
    return this.prop('src') ?? 'https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/apps/docs/public/example.md';
  }
}
