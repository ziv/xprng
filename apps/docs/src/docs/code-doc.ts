import {Component} from '@angular/core';
import {XpdDocumentationComponent} from '@xprng/docs';
import {Code} from '@xprng/code';

@Component({
  selector: 'xpd-docs-code',
  imports: [Code],
  template: `
    <xpr-code [content]="content" [src]="src" [lang]="lang"/>
  `,
})
export default class CodeDoc extends XpdDocumentationComponent {

  get content() {
    return this.prop('content');
  }

  get lang() {
    return this.prop('lang') ?? 'javascript';
  }

  get src() {
    return this.prop('src') ?? 'https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/apps/docs/public/example.js';
  }
}
