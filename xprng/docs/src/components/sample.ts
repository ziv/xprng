import {Component, input} from '@angular/core';
import {Code} from '@xprng/code';

@Component({
  selector: 'xpd-sample',
  imports: [Code],
  styles: `
    xpr-code {
      display: block;
      margin: 1em;
    }
  `,
  template: '<xpr-code [code]="sample()"/>',
})
export class Sample {
  readonly sample = input.required<string>();
}
