import {Component, inject} from '@angular/core';
import {Markdown} from '@xprng/markdown';
import Docs, {DocsHost} from '../app/features/docs';
import {DocDescriptor} from '../app/shared/descriptor';
import {Slide, Slides} from '@xprng/slides';

@Component({
  selector: 'xpd-docs',
  imports: [Slides, Slide],
  template: `
    <xpr-slides>
      <xpr-slide>A</xpr-slide>
      <xpr-slide>B</xpr-slide>
      <xpr-slide>C</xpr-slide>
    </xpr-slides>
  `,
})
export default class SlidesDoc {

  readonly desc: DocDescriptor<'content' | 'src'> = {
    id: 'slides',
    name: 'Slides Documentation',
    description: 'Documentation for the Markdown component.',
    overview: "/docs.overview.md",
    props: {
      content: {
        id: 'content',
        name: 'content',
        type: 'text',
        description: 'Markdown content to render. Do not use with `src`.',
        defaultValue: '',
      },
      src: {
        id: 'src',
        name: 'src',
        type: 'string',
        description: 'Path to a markdown file to load. Do not use with `content`.',
        defaultValue: '/example.md',
        value: '/example.md',
      }
    }
  }


  constructor() {
    const parent = inject<Docs>(DocsHost, {optional: true});
    console.log('MarkdownDoc', parent);
    if (parent) {
      parent.component.set(this.desc);
    }
  }

}
