import {Component, computed, inject, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErrorState} from '@xprng/common';
import {Markdown, MarkdownHeading} from '@xprng/markdown';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'code-demo',
  imports: [
    FormsModule,
    ErrorState,
    Markdown,
    MarkdownHeading
  ],
  template: `
    <h1>Markdown Demo</h1>
    <p>
      Markdown components.
    </p>
    <p>Takes a markdown and display range of headings:</p>
    <article>
      <xpr-markdown-heading [heading]="headings()" [range]="[1, 4]"/>
    </article>
    <p>Take a <code>src</code>, load, parse and display markdown content:</p>
    <article>
      <xpr-markdown [src]="src">
        <xpr-error-state>Markdown at "{{ src }}" not found.</xpr-error-state>
      </xpr-markdown>
    </article>

    <hr/>

  `
})
export default class MarkdownDemo {
  src = inject(PlatformLocation).getBaseHrefFromDOM() + 'example.md';
  md = viewChild(Markdown);
  protected readonly headings = computed(() => this.md()?.headings() ?? []);
}
