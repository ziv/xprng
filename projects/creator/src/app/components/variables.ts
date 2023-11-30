import { Component, Input } from '@angular/core';
import Styler from '../services/styler';
import { JsonPipe, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleLength } from './style-length';

@Component({
  standalone: true,
  selector: 'creator-variables',
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, JsonPipe, FormsModule, NgSwitchDefault, StyleLength],
  template: `
      <ng-container *ngIf="styler">
          <div *ngFor="let input of styler.styles;let i=index">
            <details>
              <summary>{{name(input.key)}}</summary>
              <ng-container [ngSwitch]="input.type">
                  <ng-container *ngSwitchCase="1">
                      <label>
                          <creator-style-length [(value)]="styler.styles[i]"
                                                (change)="styler.update()"></creator-style-length>
                      </label>
                  </ng-container>
                  <ng-container *ngSwitchCase="2">
                    <label>
                      <input type="color" [(ngModel)]="styler.styles[i].value" (ngModelChange)="styler.update()">
                    </label>
                  </ng-container>
                  <ng-container *ngSwitchDefault>
                      <label>
                          <input type="text" [(ngModel)]="styler.styles[i].value" (ngModelChange)="styler.update()">
                      </label>
                  </ng-container>
              </ng-container>
            </details>
          </div>
      </ng-container>
  `,
  styles: [
    `

      details {
        summary {
          cursor: pointer;
        }
      }

      label {
        display: flex;
        //justify-content: space-between;

        input {
          width: 5em;
        }

        input[type="color"] {
          width: 3em;
        }

        input[type="number"] {
          width: 4em;
        }

        span {
          width: 20em;
          white-space: nowrap;
        }
      }
    `
  ]
})
export class Variables {
  @Input() styler?: Styler;

  change() {
    console.log('change');
  }

  name(key: string) {
    return key.replace(/-/g, ' ').trim();
  }
}
