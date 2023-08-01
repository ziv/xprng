import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

// todo complete the list
export const LENGTH_UNITS = ['rem', 'em', 'px', '%'];

@Component({
  selector: 'creator-style-length',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <label *ngIf="css">
      <span>{{label}}</span>
      <input type="text" [(ngModel)]="value">
      <!--      <input type="range" [min]="min" [max]="max" [step]="step" [(ngModel)]="value">-->
    </label>
    <label>
      <select>
        <option>em</option>
        <option>px</option>
        <option>rem</option>
      </select>
    </label>
  `,
  styles: []
})
export class StyleLengthComponent {
  css?: CSSStyleDeclaration;

  @Input() label = '';
  @Input() set value(css: CSSStyleDeclaration) {
    if (css) {
      this.css = css;
    }
  }
  @Output() valueChange = new EventEmitter<string>();
}
