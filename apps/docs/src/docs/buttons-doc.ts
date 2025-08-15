import {Component} from '@angular/core';
import {XpdDocumentationComponent} from '../app/components/documentation-component.directive';

@Component({
  selector: 'xpd-docs-buttons',
  template: `
    <button [disabled]="prop('disabled').value">{{ prop('content').value }}</button>
  `,
})
export default class ButtonsDoc extends XpdDocumentationComponent {
}

console.log(XpdDocumentationComponent);
