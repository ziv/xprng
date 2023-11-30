import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { StyleDescriptor } from '../services/styler';

@Component({
  standalone: true,
  selector: 'creator-style-length',
  imports: [NgIf, NgFor, FormsModule],
  template: `
    <ng-container *ngIf="value">
      <input type="number" [(ngModel)]="value.value" (ngModelChange)="valueChange.emit(this.value)">
      <select [(ngModel)]="value.unit" (ngModelChange)="valueChange.emit(this.value)">
        <option *ngFor="let u of units" [value]="u">{{u}}</option>
      </select>
    </ng-container>
  `,
  styles: [`
    :host {
      display: flex;

      select {
        width: 6em;
      }
      input[type="number"] {
        width: 4em;
      }
    }
  `]
})
export class StyleLength {
  // todo complete me
  units = ['em', 'rem', '%', 'px'];
  @Input() value!: StyleDescriptor;
  @Output() valueChange = new EventEmitter<StyleDescriptor>();
}
