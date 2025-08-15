import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {XpdConfiguration} from '../services/configuration';

@Component({
  selector: 'xpd-home',
  imports: [
    RouterLink,
  ],
  host: {
    class: 'row'
  },
  template: `
    <main class="grow col">
      <div class="row g-10 m-10 wrap">
        @for (item of items; track item.route) {
          <button [routerLink]="item.route">{{ item.label }}</button>
        }
      </div>
      <! -- todo replace with xpr-markdown -->
      <p class="m-10">Yet Another Documentation Tool</p>
      <p class="m-10"><small>Made with ❤️</small></p>
    </main>
    <aside class="row centered grow hvh" [style.background-color]="'var(--pico-primary-background)'">
      <img [src]="logo" style="width: 60%" alt="logo"/>
    </aside>
  `,

})
export default class XpdHome {
  protected readonly logo = inject(XpdConfiguration).logo;
  protected readonly items = inject(XpdConfiguration).items;
}
