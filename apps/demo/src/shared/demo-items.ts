import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'xpd-demo-items',
  imports: [RouterLink],
  template: `
    @for (item of items; track item.route) {
      <button [routerLink]="item.route">{{ item.label }}</button>
    }
  `,
})
export default class DemoItems {
  items = [
    {
      label: 'Home',
      route: '/home'
    },
    {
      label: 'Code',
      route: '/code'
    },
    {
      label: 'Markdown',
      route: '/markdown'
    },
    {
      label: 'Slides',
      route: '/slides'
    }
  ];
}
