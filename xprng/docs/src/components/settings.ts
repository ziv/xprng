import {Component, effect, inject} from '@angular/core';
import { Configuration } from '../services/configuration';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KeyValuePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import { CamelCasePipe } from '../services/camel-case-pipe';

@Component({
  selector: 'xpd-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    KeyValuePipe,
    CamelCasePipe,
  ],
  template: `
    <fieldset [formGroup]="form">
      @for (item of form.controls | keyvalue; track item.key) {
        <label>{{ item.key | camelCase }}
          <input type="text" [formControl]="item.value">
        </label>
      }
    </fieldset>
  `,
})
export  class Settings {
  conf = inject(Configuration).conf;
  form = new FormGroup({});
  changed = toSignal(this.form.valueChanges);


  constructor() {
    // initializing the form with configuration data on startup only once
    const once = effect(() => {
      const data = this.conf();
      if (!data) {
        return;
      }
      for (const key in data) {
        // @ts-ignore
        const value = data[key] as string;
        this.form.addControl(key, new FormControl(value));
      }
      once.destroy();
    });

    effect(() => {
      const data = this.changed();
      if (!data) {
        return;
      }
      this.conf.set(data as any);
    });
  }
}
