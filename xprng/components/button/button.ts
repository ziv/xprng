import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: `button[xpr-button],a[xpr-button],
             button[xpr-elevated-button],a[xpr-xpr-elevated-button],
             button[xpr-outlined-button],a[xpr-outlined-button],
             button[xpr-filled-button],a[xpr-filled-button],
             button[xpr-tonal-button],a[xpr-tonal-button],
             button[xpr-fab-button],a[xpr-fab-button]`,
  exportAs: 'xprButton',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'xpr-button',
  },
  styles: `
    [xpr-button] {
      display: flex;
      align-items: center;
    }
  `,
  template: `
    <ng-content select="xpr-icon,xpr-icon-start"/>
    <ng-content/>
    <ng-content select="xpr-icon-end"/>
  `,
})
export class XprButton {
}
