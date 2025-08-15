import {Component} from '@angular/core';
import {DocumentationComponent} from '../app/components/documentation-component';

@Component({
  selector: 'xpd-docs-buttons',
  template: `
    <button [disabled]="prop('disabled').value">{{ prop('content').value }}</button>
  `,
})
export default class ButtonsDoc extends DocumentationComponent {
}

console.log(DocumentationComponent);
