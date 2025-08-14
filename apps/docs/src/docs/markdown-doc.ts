import {Component} from '@angular/core';
import {Markdown} from '@xprng/markdown';
import {DocumentationComponent} from '../app/documentation-component';
// import {DocumentationComponent} from '@xprng/docs';

@Component({
  selector: 'xpd-docs-markdown',
  imports: [Markdown],
  template: `
    @if (prop('content').value) {
      <xpr-markdown [content]="prop('content').value"/>
    } @else if (prop('src').value) {
      <xpr-markdown [src]="prop('src').value"/>
    } @else {
      <p>No content or source provided.</p>
    }
  `,
})
export default class MarkdownDoc extends DocumentationComponent {

}
