import { Component, input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Prop } from "../descriptor";
import { debugLog, isDebug } from "../utils";

function read() {
  const value = localStorage.getItem("__xpd-properties");
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
  saved[name ?? ""] = value;
  localStorage.setItem("__xpd-properties", JSON.stringify(saved));
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
                  <input type="text" [value]="prop.value" (keyup)="update(prop.name, $event)"/>
                  <small class="xpd-dec">{{ prop.description }}</small>
                </label>
              }
              @case ('text') {
                <label>
                  <textarea [value]="prop.value" (keyup)="update(prop.name, $event)"></textarea>
                  <small>{{ prop.description }}</small>
                </label>
              }
              @case ('number') {
                <label>
                  <input type="number" [value]="prop.value" (keyup)="update(prop.name, $event)"
                         (change)="update(prop.name, $event)"/>
                  <small>{{ prop.description }}</small>
                </label>
              }
              @case ('boolean') {
                <label>
                  <input type="checkbox" [checked]="prop.value" (change)="update(prop.name, $event)"/>
                  <span>{{ prop.description }}</span>
                </label>
              }
              @case ('list') {
                <label>
                  <select [value]="prop.value" (change)="update(prop.name, $event)">
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
  `,
})
export class XpdProperties {
  output: any = {};
  readonly name = input.required<string | undefined>();
  readonly props = input.required<Prop[]>();

  update(name: string, event: Event) {
    // @ts-ignore
    const v = event.target.value;
    if (v === "on") {
      // @ts-ignore
      this.output[name] = event.target.checked;
    } else {
      this.output[name] = v;
    }
    debugLog("Updating properties:", this.name(), this.output);
    localStorage.setItem(
      "__xpd-properties",
      JSON.stringify({ [this.name() ?? ""]: this.output }),
    );
  }
}
