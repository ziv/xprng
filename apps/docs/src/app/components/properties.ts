import {Component, input} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {Prop} from "../descriptor";

@Component({
  selector: "xpd-properties",
  imports: [
    FormsModule,
  ],
  styles: `
    :host {
      display: block;
      --pico-line-height: 1;
      --pico-spacing: 0.5rem;
      --pico-typography-spacing-vertical: 0.5rem;
      --pico-form-element-spacing-vertical: 0.5rem;
      --pico-form-element-spacing-horizontal: 0.5rem;
      --pico-background-color: var(--pico-secondary-background);

      td, th, td small.xpd-dec {
        --pico-color: var(--pico-primary-inverse);
        --pico-muted-color: var(--pico-primary-inverse);
      }

      td, th {
        vertical-align: top;
      }
    }

    section {
      display: flex;
      height: 30px;

      .name {
        border: 1px solid #ccc;
        width: 100px;
        height: 30px;
        line-height: 30px;
      }
    }

    table {
      width: 100%;

      td, th {
        height: 80px;
      }
    }
  `,
  template: `
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
                  <input type="text" [(ngModel)]="prop.value"/>
                  <small class="xpd-dec">{{ prop.description }}</small>
                </label>
              }
              @case ('text') {
                <label>
                  <textarea [(ngModel)]="prop.value"></textarea>
                  <small>{{ prop.description }}</small>
                </label>
              }
              @case ('number') {
                <label>
                  <input type="number" [(ngModel)]="prop.value"/>
                  <small>{{ prop.description }}</small>
                </label>
              }
              @case ('boolean') {
                <label>
                  <input type="checkbox" [(ngModel)]="prop.value"/>
                  <span>{{ prop.description }}</span>
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
  `,
})
export class XpdProperties {
  readonly props = input.required<Prop[]>();
}
