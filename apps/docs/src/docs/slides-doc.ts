import {Component} from '@angular/core';
import {Slide, Slides} from '@xprng/slides';
import {XpdDocumentationComponent} from '@xprng/docs';

@Component({
  selector: 'xpd-docs-slides',
  imports: [Slides, Slide],
  styles: `
    xpr-slides {
      width: 400px;
      height: 300px;
      background-color: #0d6efd;
    }

    xpr-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 3em;
    }
  `,
  template: `
    <xpr-slides [cyclic]="prop('cyclic').value">
      <xpr-slide>Slide A</xpr-slide>
      <xpr-slide>Slide B</xpr-slide>
      <xpr-slide>Slide C</xpr-slide>
      <xpr-slide>Slide D</xpr-slide>
      <xpr-slide>Slide E</xpr-slide>
    </xpr-slides>
  `,
})
export default class SlidesDoc extends XpdDocumentationComponent {
}
