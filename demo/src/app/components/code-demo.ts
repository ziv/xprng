import {Component, inject, signal} from '@angular/core';
import {Code} from '@xprng/code';
import {FormsModule} from '@angular/forms';
import {ErrorState} from '@xprng/common';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'code-demo',
  imports: [
    Code,
    FormsModule,
    ErrorState
  ],
  template: `
    <h1>Code Demo</h1>
    <p>
      A wrapper around Shiki to load and display code snippets with syntax highlighting.
    </p>
    <article>
      <xpr-code lang="javascript"
                [theme]="theme()"
                [src]="src()">
        <xpr-error-state>File at "{{ src() }}" not found.</xpr-error-state>
      </xpr-code>
    </article>
    <hr/>
    <h2>Options</h2>

    <div>
      <label for="theme">Loaded Theme: </label>
      <select [(ngModel)]="theme" id="theme">
        <option value="nord">nord</option>
        <option value="github-light">github-light</option>
        <option value="github-dark">github-dark</option>
        <option value="catppuccin-latte">catppuccin-latte</option>
      </select>
    </div>

    <div>
      <label for="state">Select state: </label>
      <select [(ngModel)]="src" id="state">
        <option [value]="valid">valid url</option>
        <option value="http://localhost/">invalid url</option>
      </select>
    </div>
  `
})
export default class CodeDemo {
  valid = inject(PlatformLocation).getBaseHrefFromDOM() + 'example-code.js';

  src = signal<string>(this.valid);
  theme = signal<string>('catppuccin-latte');


}
