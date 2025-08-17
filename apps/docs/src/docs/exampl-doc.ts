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
      <details name="example" [open]="prop('open')">
        <summary>Accordion example</summary>
        <p>Button Example</p>
        <p>
          <button [disabled]="prop('disabled')" [class]="prop('type')">{{ prop('content') }}</button>
        </p>
        <p>Switch example</p>
        <fieldset>
          <label>
            <input name="terms" type="checkbox" checked role="switch" [class]="prop('type')"/>
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
