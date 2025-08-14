import {Component, computed, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Prop} from './descriptor';


@Component({
  selector: 'xpd-props',
  imports: [
    FormsModule
  ],
  styles: `
    :host {
      display: block;
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
  `,
  template: `
    <div>
      properties
    </div>
    <table border="1" style="width: 100%">
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
                <span class="label">
                <input type="text" [(ngModel)]="prop.value"/>
              </span>
              }
              @case ('text') {
                <span class="label">
                <textarea [(ngModel)]="prop.value"></textarea>
              </span>
              }
              @case ('number') {
                <span class="label">{{ prop.type }}</span>
              }
              @case ('boolean') {

                <span class="label">
                  <input type="checkbox" [(ngModel)]="prop.value"/>
                </span>
              }
              @default {
                <span class="label">unknown</span>
              }
            }
          </td>
        </tr>
        <tr>
          <th>&nbsp;</th>
          <td>{{ prop.description }}</td>
        </tr>
      }
    </table>
  `,
})
export default class Props {
  readonly props = input.required<Prop[]>();

}
