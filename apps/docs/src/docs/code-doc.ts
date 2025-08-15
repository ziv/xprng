import {Component} from '@angular/core';
import {DocumentationComponent} from '../app/components/documentation-component';
import {Code} from '@xprng/code';

@Component({
  selector: 'xpd-docs-slides',
  imports: [Code],
  template: `
    @if (code) {
      <xpr-code [content]="code" [lang]="language"/>
    } @else if (source) {
      <xpr-code [src]="source" [lang]="language"/>
    } @else {
      <p>No code content or source provided.</p>
    }
  `,
})
export default class CodeDoc extends DocumentationComponent {
  get language(): string {
    return this.prop('lang').value ?? 'javascript';
  }

  get code() {
    return this.prop('content').value;
  }

  get source() {
    return this.prop('src').value;
  }
}
