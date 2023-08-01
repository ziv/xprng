import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'icon',
//   standalone: true,
//   template: '<ng-content></ng-content>'
// })
// export class Dummy {
//   /**
//    * This "dummy" component is just a simple way
//    * to register all the listed selector as an HTML tags
//    *
//    * In production, use:
//    * @Component({
//    *    ...
//    *    schemas: [NO_ERRORS_SCHEMA],
//    * })
//    */
// }

@Component({
  selector: 'demo-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
      <form>
          <label>
              <span>Email</span>
              <input type="email" placeholder="name@company.com">
          </label>
          <label>
              <span>Password</span>
              <input type="password">
          </label>
          <button>LOGIN</button>
          <icon>help</icon>
      </form>
  `,
  styles: [
    `
      label {
        justify-content: space-between;
        margin-bottom: .5em;
      }

      form {
        width: 30rem;
      }
    `
  ]
})
export class LoginComponent {

}
