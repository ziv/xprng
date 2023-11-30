import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'creator-container',
  template: `
      <header>{{title}}</header>
      <ng-content></ng-content>`
})
export class Container {
  @Input() title = '';
  @Input() opened = true;
}
