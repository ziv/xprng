import { Component } from '@angular/core';
import DemoItems from '../shared/demo-items';

@Component({
  selector: 'xpd-home',
  imports: [
    DemoItems
  ],
  template: `
    <h1>XPRNG Demos</h1>
    <xpd-demo-items/>
  `,
})
export default class Home {

}
