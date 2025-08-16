import {Component} from '@angular/core';
import {Markdown} from '@xprng/markdown';
import {XpdDocumentationComponent} from '../app/components/documentation-component';

@Component({
  selector: 'xpd-docs-markdown',
  imports: [Markdown],
  template: `
    @if (markdown) {
      <xpr-markdown [content]="markdown"/>
    } @else if (source) {
      <xpr-markdown [src]="source"/>
    } @else {
      <p>No markdown content or source provided.</p>
    }
  `,
})
export default class MarkdownDoc extends XpdDocumentationComponent {

  get markdown() {
    return this.prop('content').value;
  }

  get source() {
    return this.prop('src').value;
  }
}
