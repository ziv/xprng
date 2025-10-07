import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'xpr-field',
  host: {
    class: 'xpr-field'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <ng-content select="label,xpr-label"/>
      <div class="input-wrapper">
        <ng-content/>
      </div>
    </div>`,
})
export class XprField {
}
