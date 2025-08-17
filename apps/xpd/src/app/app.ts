import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('@apps/xpd');
}
