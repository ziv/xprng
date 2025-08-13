import {Component} from '@angular/core';
import {Slide, Slides} from '@xprng/slides';

@Component({
  selector: 'xpd-slides',
  imports: [
    Slide,
    Slides,
  ],
  styles: `
    xpr-slides {
      width: 500px;
      height: 300px;
      background-color: green;
      color: white;
    }

    xpr-slide div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  `,
  template: `
    <h1>Slides</h1>
    <p>Display slide show</p>
    <xpr-slides>
      <xpr-slide>
        <div>Slide A</div>
      </xpr-slide>
      <xpr-slide>
        <div>Slide B</div>
      </xpr-slide>
      <xpr-slide>
        <div>Slide C</div>
      </xpr-slide>
    </xpr-slides>
  `,
})
export default class SlidesFeatures {

}
