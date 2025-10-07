import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'xpr-icon,xpr-icon-start,xpr-icon-end',
  host: {
    role: 'img',
    class: 'xpr-icon material-symbols-outlined'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content/>',
})
export class XprIcon  {
}
