import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Slide, Slides} from '@xprng/slides';

@Component({
  selector: 'slides-demo',
  imports: [
    FormsModule,
    Slides,
    Slide
  ],
  template: `
    <h1>Slides Demo</h1>
    <p>
      This is a demo component for the slide component
    </p>
    <article>
      <xpr-slides cyclic style="min-height:407px">
        <xpr-slide>
          <img src="/slide0.jpg"/>
        </xpr-slide>
        <xpr-slide>
          <img src="/slide1.jpg"/>
        </xpr-slide>
        <xpr-slide>
          <img src="/slide2.jpg"/>
        </xpr-slide>
        <xpr-slide>
          <img src="/slide3.jpg"/>
        </xpr-slide>
      </xpr-slides>
    </article>

    <hr/>
    <h2>Options</h2>
    <p>Use arrow keys, <kbd>space</kbd>, <kbd>backspace</kbd>, <kbd>home</kbd> and <kbd>end</kbd> to navigate the slides.</p>
    <p>Use <kbd>a</kbd> to toggle autoplay.</p>
    <p>Use <kbd>+</kbd> and <kbd>-</kbd> to increase/decrease autoplay interval.</p>
  `
})
export default class SlidesDemo {

}
