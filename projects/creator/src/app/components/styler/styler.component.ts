import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'creator-styler',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>{{name}}</div>
    <div>
      <input>
    </div>
    <div>unit</div>
  `,
  styles: []
})
export class StylerComponent {
  @Input() styles: string[] = [];
  @Input() name = '';
  @Input() value: unknown;
}
