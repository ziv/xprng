import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import XpdHelpDialog from './components/help-dialog';
import XpdSettingsDialog from './components/settings-dialog';
import XpdDialogs from './services/dialogs';

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet, XpdHelpDialog, XpdSettingsDialog],
  host: {
    '(document:keydown.meta.s)': 'dialogs.settings($event)',
    '(document:keydown.meta.h)': 'dialogs.help($event)',
    '(document:keydown.Esc)': 'dialogs.clear($event)',
  },
  template: `
    <xpd-settings-dialog/>
    <xpd-help-dialog/>
    <router-outlet/>
  `,
})
export default class App {
  protected dialogs = inject(XpdDialogs);
}
