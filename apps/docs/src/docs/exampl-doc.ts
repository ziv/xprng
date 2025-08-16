import {Component} from '@angular/core';
import {XpdDocumentationComponent} from '@xprng/docs';

@Component({
  selector: 'xpd-docs-buttons',
  styles: `
    :host {
      flex: 1;
    }
  `,
  template: `
    <article>
      <details name="example" [open]="propValue('open')">
        <summary>Accordion example</summary>
        <p>Button Example</p>
        <p>
          <button [disabled]="propValue('disabled')" [class]="propValue('type')">{{ propValue('content') }}</button>
        </p>
        <p>Switch example</p>
        <fieldset>
          <label>
            <input name="terms" type="checkbox" checked role="switch" [class]="propValue('type')"/>
            I agree to the Terms
          </label>
        </fieldset>
        <p>Range Example</p>
        <label>
          Brightness
          <input type="range"/>
        </label>

      </details>
    </article>
  `,
})
export default class ExamplDoc extends XpdDocumentationComponent {

}
