import {Component} from '@angular/core';
import {DocDescriptor} from '../app/shared/descriptor';
import DocumentationComponent from '../app/shared/documentation-component';

@Component({
  selector: 'xpd-docs',
  template: `
    <button [disabled]="prop('disabled').value">{{ prop('content').value }}</button>
  `,
})
export default class MarkdownDoc extends DocumentationComponent {
}
