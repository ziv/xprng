import { Component, input } from '@angular/core';

@Component({
  selector: 'xprc-form-element-desc',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{ type() }}
    </p>
  `,
  styles: ``
})
export class FormElementDescComponent {
  type = input.required<string>();
}
