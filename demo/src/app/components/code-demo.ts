import {Component, signal} from '@angular/core';
import {Code} from '@xprng/code';
import {ErrorState} from '@xprng/common';
import {Field, form} from '@angular/forms/signals';

@Component({
  selector: 'code-demo',
  imports: [
    Code,
    ErrorState,
    Field
  ],
  template: `
    <h1>Code Demo</h1>
    <p>
      A wrapper around Shiki to load and display code snippets with syntax highlighting.
    </p>
    <article>
      <xpr-code lang="javascript"
                [theme]="props().theme"
                [src]="props().src">
        <xpr-error-state>File at "{{ props().src }}" not found.</xpr-error-state>
      </xpr-code>
    </article>
    <hr/>

    <h2>Options</h2>

    <div>
      <label for="theme">Loaded Theme: </label>
      <select [field]="frm.theme" id="theme">
        <option value="nord">nord</option>
        <option value="github-light">github-light</option>
        <option value="github-dark">github-dark</option>
        <option value="catppuccin-latte">catppuccin-latte</option>
      </select>
    </div>

    <div>
      <label for="state">Select state: </label>
      <select [field]="frm.src" id="state">
        <option value="https://ziv.github.io/xprng/example-code.js">valid url</option>
        <option value="http://localhost/example-code.js">invalid url</option>
      </select>
    </div>
  `
})
export default class CodeDemo {
  protected readonly props = signal({
    src: 'https://ziv.github.io/xprng/example-code.js',
    theme: 'catppuccin-latte'
  });
  protected readonly frm = form(this.props);
}
