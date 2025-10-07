import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'xpr-field',
  host: {
    class: 'xpr-field'
  },
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset>
      <ng-content select="label"/>
      <div>
        <ng-content select="xpr-prefix"/>
        <ng-content select="input,textarea,select"/>
        <ng-content select="xpr-suffix"/>
      </div>
      <ng-content select="xpr-hint"/>
      <ng-content select="xpr-error"/>
    </fieldset>
  `,
})
export class XprField {
}
