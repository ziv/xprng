import {Component} from '@angular/core';
import {XprButton, XprIconButton} from '@xprng/components/button';
import {XprIcon} from '@xprng/components/icon';
import {XprField} from '@xprng/components/input';

@Component({
  selector: 'code-more',
  imports: [
    XprButton,
    XprIconButton,
    XprIcon,
    XprField,
  ],
  template: `
    <xpr-field>
      <label>Email Address</label>
      <input type="email" placeholder="e.g. name@example.com">
    </xpr-field>

    <xpr-field>
      <label>Password</label>
      <input type="password" placeholder="Your password">
    </xpr-field>

    <button>Login</button>
  `
})
export default class More {

}
