import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'button[xpr-icon-button],a[xpr-icon-button]',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'xpr-icon-button',
  },
  styles: `
    [xpr-icon-button] {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  template: `
    <ng-content/>
  `,
})
export class XprIconButton {
  // readonly xprButton = input<ButtonType>('text');
}
