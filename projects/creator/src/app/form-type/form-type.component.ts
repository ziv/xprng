import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormElementType } from '@xpr/simple-form';

@Component({
  selector: 'xprc-form-type',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <select #t>
      @for (type of types; track type) {
        <option [value]="type">{{ type }}</option>
      }
    </select>
    <button (click)="add.emit(t.value)">ADD ITEM</button>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FormTypeComponent {
  protected types = Object.values(FormElementType);
  add = output<string>();
}
