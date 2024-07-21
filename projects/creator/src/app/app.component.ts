import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormTypeComponent } from './form-type/form-type.component';
import { FormElementType, SimpleFormGroup } from '@xpr/simple-form';
import { formByType } from './defaults-forms';

@Component({
  selector: 'xprc-root',
  standalone: true,
  imports: [RouterOutlet, FormTypeComponent],
  template: `
    <h1>FORM CREATOR</h1>
    <p>Use this tool to create simple forms.</p>
    <xprc-form-type (add)="add($event)"></xprc-form-type>
  `,
  styles: `

  `
})
export class AppComponent {
  desc = new SimpleFormGroup({});

  add(type: unknown) {
    // const form = formByType(type as FormElementType);
    // this.desc.addControl('')
    // console.log(form);
  }
}
