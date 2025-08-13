import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import DemoItems from '../shared/demo-items';

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet, DemoItems],
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }

    aside {
      width: 20%;
      background: #a6e162;
    }

    main {
      flex: 1;
      background: #6491ff;
      padding: 1rem;
    }
  `,
  template: `
    <aside>
      <nav>
        <xpd-demo-items></xpd-demo-items>
      </nav>
    </aside>
    <main>
      <router-outlet/>
    </main>
  `,
})
export class App {
}
