import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'creator-sample-form',
  template: `
  <div>
    <section data-color="primary">
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
    <section class="buttons">
      <button>default</button>
      <button data-color="primary">primary</button>
      <button data-color="secondary">secondary</button>
      <button data-color="error">error</button>
      <button class="icon">icon</button>
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

    .buttons {
      flex-direction: column;
      width: 10em;
    }
    `
  ]
})
export class SampleForm {

}
