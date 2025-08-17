import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {XpdConfiguration} from '../services/configuration';

@Component({
  selector: 'xpd-home',
  imports: [
    RouterLink,
  ],
  host: {
    class: 'row pico'
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
      <img src="/xprng/logosh.svg" routerLink="/home" style="width: 60%" alt="logo"/>
    </aside>
  `,

})
export class XpdHome {
  protected readonly items = inject(XpdConfiguration).items;
}
