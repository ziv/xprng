import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'creator-sample-form',
  template: `
  <div>
    <section>
      <input type="text">
      <input type="text">
      <button data-color="primary">save</button>
    </section>
    <section>
      <div>
        <textarea></textarea>
      </div>
      <select>
        <option>value A</option>
        <option>value B</option>
      </select>
    </section>
  </div>
  `,
  styles: [
    `
    section {
      width: 40em;
      display: flex;
      gap: 1em;
      margin-bottom: 1em;
    }
    `
  ]
})
export class SampleForm {

}
