import {Component, inject, signal} from '@angular/core';
import {Markdown} from '@xprng/markdown';
import Docs, {DocsHost} from '../app/features/docs';
import {DocDescriptor} from '../app/shared/descriptor';

@Component({
  selector: 'xpd-docs',
  imports: [Markdown],
  template: `
    @if (desc.props.content.value) {
      <xpr-markdown [content]="desc.props.content.value"/>
    } @else if (desc.props.src.value) {
      <xpr-markdown [src]="desc.props.src.value"/>
    } @else {
      <p>No content or source provided.</p>
    }
  `,
})
export default class MarkdownDoc {

  readonly desc: DocDescriptor<'content' | 'src'> = {
    id: 'markdown',
    name: 'Markdown Documentation',
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

  // readonly cd = {
  //   id: 'markdown',
  //   name: 'Markdown',
  //   description: 'A component to render Markdown content.',
  //   sample: '<xpr-markdown [content]="content.value" [src]="src.value"/>',
  //   props: {
  //     content: {
  //       id: 'content',
  //       name: 'content',
  //       type: 'text',
  //       description: 'Markdown content to render. Do not use with `src`.',
  //       defaultValue: '',
  //     },
  //     src: {
  //       id: 'src',
  //       name: 'src',
  //       type: 'string',
  //       description: 'Path to a markdown file to load. Do not use with `content`.',
  //       defaultValue: '/example.content',
  //       value: '/example.content',
  //     }
  //   }
  // };
  parent = inject<Docs>(DocsHost, {optional: true});

  constructor() {
    console.log('MarkdownDoc', parent);
    if (this.parent) {
      this.parent.component.set(this.desc);
    }
  }

}
