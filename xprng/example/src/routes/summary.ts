import {Component} from "@angular/core";
import {Slide, Slides} from '@xprng/slides';

const DIRECT_USAGE = `<xpr-code md="..." />`;
const REMOTE_USAGE = `<xpr-code src="..." />`;

@Component({
  selector: "ex-code-example",
  host: {
    class: "block w-full p-4",
  },
  imports: [
    Slides,
    Slide
  ],
  template: `
    <h1>XPRNG</h1>
    <p>Micro packages of very simple - but high quality - smart components.</p>
    <p>
      <xpr-slides idx="1" cyclic="true" interval="500" style="background-color: red;color: white;height: 300px;">
        <xpr-slide>AAAAAAAAAAAAA</xpr-slide>
        <xpr-slide>BBBBBBBBBBBBB</xpr-slide>
        <xpr-slide>CCCCCCCCCCCCC</xpr-slide>
        <xpr-slide>DDDDDDDDDDDDD</xpr-slide>
      </xpr-slides>
    </p>
    <button (click)="action()">change</button>
  `,
})
export default class Summary {
  action() {

  }
}
