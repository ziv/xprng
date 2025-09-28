import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Slide, Slides} from '@xprng/slides';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'slides-demo',
  imports: [
    FormsModule,
    Slides,
    Slide,
    NgOptimizedImage
  ],
  template: `
    <h1>Slides Demo</h1>
    <p>
      A simple slideshow component with keyboard navigation and autoplay support.
    </p>
    <article>
      <xpr-slides cyclic style="height:400px;overflow:hidden">
        @for (i of images; track i.src) {
          <xpr-slide>
            <img [ngSrc]="i.src"
                 [alt]="i.alt"
                 [height]="i.height"
                 [width]="i.width"
                 priority/>
          </xpr-slide>
        }
      </xpr-slides>
    </article>

    <hr/>
    <h2>Options</h2>
    <p>Use arrow keys, <kbd>space</kbd>, <kbd>backspace</kbd>, <kbd>home</kbd> and <kbd>end</kbd> to navigate the
      slides.</p>
    <p>Use <kbd>a</kbd> to toggle autoplay.</p>
    <p>Use <kbd>+</kbd> and <kbd>-</kbd> to increase/decrease autoplay interval.</p>
  `
})
export default class SlidesDemo {

  images = [
    {
      src: '/slide0.jpg',
      alt: 'slide0',
      height: 408,
      width: 612
    },
    {
      src: '/slide1.jpg',
      alt: 'slide1',
      height: 407,
      width: 612
    },
    {
      src: '/slide2.jpg',
      alt: 'slide2',
      height: 433,
      width: 612
    },
    {
      src: '/slide3.jpg',
      alt: 'slide3',
      height: 406,
      width: 612
    }
  ]
}
