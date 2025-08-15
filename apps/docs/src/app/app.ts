import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import HelpDialog from './components/help-dialog';
import SettingsDialog from './components/settings-dialog';
import Dialogs from './services/dialogs';

@Component({
  selector: 'xpd-root',
  imports: [RouterOutlet, HelpDialog, SettingsDialog],
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
  protected dialogs = inject(Dialogs);
}
