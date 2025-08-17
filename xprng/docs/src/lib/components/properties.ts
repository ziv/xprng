import {Component, effect, input, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule,} from "@angular/forms";
import {Prop} from "../descriptor";
import {isDebug} from '../utils';

function read() {
  const value = localStorage.getItem('__xpd-properties');
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      if (isDebug()) {
        console.error("Failed to parse properties from localStorage:", e);
      }
    }
  }
  return {};
}

function update(value: unknown, name?: string) {
  const saved = read();
  saved[name ?? ''] = value;
  localStorage.setItem('__xpd-properties', JSON.stringify(saved));
}

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

      /*--pico-background-color: var(--pico-secondary-background);*/

      td, th, td small.xpd-dec {
        /*--pico-color: var(--pico-secondary-inverse);*/
        /*--pico-muted-color: var(--pico-secondary-inverse);*/
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
  readonly name = input.required<string | undefined>();
  readonly props = input.required<Prop[]>();

  constructor() {
    this.form.valueChanges.subscribe(value => {
      update(value, this.name());
    });

    effect(() => {
      // as soon as props are set, initialize the form controls
      const value = {} as Record<string, unknown>;
      for (const prop of this.props()) {
        this.form.addControl(prop.name, new FormControl(prop.value));
        value[prop.name] = prop.value;
      }
      update(value, this.name());
      if (isDebug()) {
        console.info("XpdProperties initialized with props:", this.props());
        console.info("Form controls:", this.form.controls);
      }
    });
  }
}
