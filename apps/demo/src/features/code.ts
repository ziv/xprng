import {Component} from '@angular/core';
import {Code} from '@xprng/code';

@Component({
  selector: 'xpd-code',
  imports: [Code],
  template: `
    <h1>Markdown</h1>
    <p>Load code from "/example.js" and display it.</p>
    <xpr-code src="/example.js" language="javascript"></xpr-code>
  `,
  styles: ``
})
export default class CodeFeature {
}
