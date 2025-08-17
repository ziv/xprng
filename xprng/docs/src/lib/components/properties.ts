import {Component, computed, effect, input, output} from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Prop} from "../descriptor";
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: "xpd-properties",
  imports: [
    ReactiveFormsModule,
  ],
  styles: `
    :host {
      display: block;
      zoom: 0.65;
      /*--pico-line-height: 1;*/
      /*--pico-spacing: 0.5rem;*/
      /*--pico-typography-spacing-vertical: 0.5rem;*/
      /*--pico-form-element-spacing-vertical: 0.5rem;*/
      /*--pico-form-element-spacing-horizontal: 0.5rem;*/
      --pico-background-color: var(--pico-secondary-background);

      td, th, td small.xpd-dec {
        --pico-color: var(--pico-secondary-inverse);
        --pico-muted-color: var(--pico-secondary-inverse);
      }
    }

    table {
      width: 100%;

      th {
        white-space: nowrap;
      }
    }
  `,
  template: `
    <form [formGroup]="form">
      <table>
        @for (prop of props(); track prop.name) {
          <tr>
            <th>
              <span class="label">{{ prop.name }}</span>
              @if (prop.required) {
                <span class="required">* required</span>
              }
            </th>
            <td>
              @switch (prop.type) {
                @case ('string') {
                  <label>
                    <input type="text" [formControlName]="prop.name"/>
                    <small class="xpd-dec">{{ prop.description }}</small>
                  </label>
                }
                @case ('text') {
                  <label>
                    <textarea [formControlName]="prop.name"></textarea>
                    <small>{{ prop.description }}</small>
                  </label>
                }
                @case ('number') {
                  <label>
                    <input type="number" [formControlName]="prop.name"/>
                    <small>{{ prop.description }}</small>
                  </label>
                }
                @case ('boolean') {
                  <label>
                    <input type="checkbox" [formControlName]="prop.name"/>
                    <span>{{ prop.description }}</span>
                  </label>
                }
                @case ('list') {
                  <label>
                    <select [formControlName]="prop.name">
                      @if (prop.options) {
                        @for (option of prop.options; track option.value) {
                          <option [value]="option.value">{{ option.label }}</option>
                        }
                      }
                    </select>
                    <small>{{ prop.description }}</small>
                  </label>
                }
                @default {
                  <span class="label">unknown</span>
                }
              }
            </td>
          </tr>
        }
      </table>
    </form>
  `,
})
export class XpdProperties {
  protected readonly form = new FormGroup({});
  protected readonly changed = toSignal(this.form.valueChanges);

  readonly props = input.required<Prop[]>();
  readonly change = output<{ [key: string]: string | number | boolean }>();

  constructor() {
    effect(() => {
      for (const prop of this.props()) {
        if (!this.form.contains(prop.name)) {
          this.form.addControl(prop.name, new FormControl(prop.value));
        } else {
          this.form.get(prop.name)?.setValue(prop.value);
        }
      }
    });

    effect(() => {
      // replace the iframe url
      // console.log(this.changed());
      this.change.emit(this.changed() as { [key: string]: string | number | boolean });
    });
  }
}
