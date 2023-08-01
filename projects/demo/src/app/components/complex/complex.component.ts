import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo-complex',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
      <form>
          <fieldset>
              <legend>Personal</legend>
              <section>
                  <label>
                      <span>Initials</span>
                      <input type="text" name="initials" placeholder="Mr/Mrs/Dr/...">
                  </label>
                  <label>
                      <span>First Name</span>
                      <input type="text" name="first" placeholder="John">
                  </label>
                  <label>
                      <span>Last Name</span>
                      <input type="text" name="last" placeholder="Doe">
                  </label>
              </section>
              <section>
                  <label>
                      <span>Address</span>
                      <input type="text" name="address" placeholder="Over the rainbow">
                  </label>
                  <label>
                      <span>City</span>
                      <input type="text" name="city" placeholder="Over the rainbow">
                  </label>
                  <label>
                      <span>Country</span>
                      <select name="country">
                          <option>Moon</option>
                          <option>Mercury</option>
                          <option>Venus</option>
                      </select>
                  </label>
                  <label>
                      <span>Zip</span>
                      <input type="text" name="zip" placeholder="12345">
                  </label>
              </section>
          </fieldset>

          <fieldset>
              <legend>Business</legend>
              <section>
                  <label>
                      <span>Workplace</span>
                      <input type="text" name="work">
                  </label>
              </section>
              <section>
                  <label>
                      <span>Xxx</span>
                      <input type="text" name="xxx">
                  </label>
                  <label>
                      <input type="checkbox">
                      <span>Male</span>
                  </label>
                  <label>
                      <input type="checkbox">
                      <span>Female</span>
                  </label>
              </section>
          </fieldset>
          <section>
              <button>Save</button>
              <icon>help</icon>
          </section>
      </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }

      fieldset {
        border: 1px solid #9b4dca;
        border-radius: .25em;
        padding: .5em 1em;

        legend {
          padding: 0 .5em;
        }
      }

      section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;
        margin-bottom: 1em;

        label {
          flex: 1;
          column-gap: 1em;
          justify-content: space-between;
          align-items: center;

          span {
            white-space: nowrap;
          }
        }
      }
    `
  ]
})
export class ComplexComponent {

}
