import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErrorState} from '@xprng/common';
import {Markdown} from '@xprng/markdown';

@Component({
  selector: 'code-demo',
  imports: [
    FormsModule,
    ErrorState,
    Markdown
  ],
  template: `
    <h1>Markdown Demo</h1>
    <p>
      This is a demo component for markdown component.
    </p>
    <article>
      <xpr-markdown [src]="src()">
        <xpr-error-state>Markdown at "{{ src() }}" not found.</xpr-error-state>
      </xpr-markdown>
    </article>

    <hr/>

  `
})
export default class MarkdownDemo {
  src = signal<string>('/example.md');
}
