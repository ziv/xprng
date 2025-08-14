import {Component} from '@angular/core';
import {DocDescriptor} from '../app/shared/descriptor';
import {Slide, Slides} from '@xprng/slides';
import DocumentationComponent from '../app/shared/documentation-component';

const slidesDescriptor: DocDescriptor = {
  id: 'slides',
  name: 'Slides Documentation',
  description: 'Documentation for the Markdown component.',
  overview: "/docs.overview.md",
  props: [
    {
      id: 'cyclic',
      name: 'cyclic',
      type: 'boolean',
      description: 'Enable cyclic navigation through slides.',
      value: false,
    }
  ]
};

@Component({
  selector: 'xpd-docs',
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
export default class SlidesDoc extends DocumentationComponent {
}
