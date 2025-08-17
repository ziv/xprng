import {Component} from '@angular/core';
import {XpdWrap} from '@xprng/docs';

@Component({
  selector: 'xpd-docs-buttons',
  host: {
    class: 'pico'
  },
  styles: `
    :host {
      flex: 1;
    }
  `,
  template: `
    <article>
      <details name="example" [open]="isOpen">
        <summary>Accordion example</summary>
        <p>Button Example</p>
        <p>
          <button (click)="notify($event)"
                  [disabled]="btnDisabled"
                  [class]="type">{{ buttonText }}
          </button>
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
export default class ExampleDoc extends XpdWrap {

  get buttonText() {
    return this.prop<string>('text') ?? 'Click me';
  }

  get type() {
    return this.prop<string>('type') ?? '';
  }

  get btnDisabled() {
    return this.prop<boolean>('disabled') ?? false;
  }

  get isOpen() {
    return this.prop<boolean>('open') ?? true;
  }
}
