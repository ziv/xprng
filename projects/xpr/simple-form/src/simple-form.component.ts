import { Component, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { FormElements, FormElementType, SimpleFormGroup } from './simple-form';

@Component({
  selector: 'xpr-simple-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgComponentOutlet],
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (form()) {
      <ng-container [formGroup]="form()">
        @for (item of controls(); track item.control) {
          <label [ngClass]="'xpr-label xpr-type-'+item.type">
            <span class="xpr-label">{{ item.label }}</span>
            <span class="xpr-input">
            @switch (item.type) {
              @case (types.Checkbox) {
                <!-- todo checkbox does not working when bound -->
                <input type="checkbox"
                       [formControlName]="item.control">
              }
              @case (types.Range) {
                <input type="range"
                       [formControlName]="item.control"
                       [min]="item.min"
                       [max]="item.max"
                       [step]="item.step">
              }
              @case (types.Select) {
                <select [formControlName]="item.control">
                @for (el of item.options; track el.value) {
                  <option [ngValue]="el.value">{{ el.label }}</option>
                }
                </select>
              }
              @case (types.Custom) {
                <ng-container *ngComponentOutlet="item.cmp;inputs:{form: form()}"/>
              }
              @default {
                <input [type]="item.type"
                       [formControlName]="item.control">
              }
            }
          </span>
          </label>
        }
      </ng-container>
    }
  `
})
export class XprSimpleForm {
  protected readonly types = FormElementType;
  form = input.required<SimpleFormGroup>();

  protected* controls(): Generator<FormElements> {
    for (const c of Object.values(this.form().controls)) {
      yield c.desc as FormElements;
    }
  }
}
