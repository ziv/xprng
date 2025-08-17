import { Component, computed, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Markdown } from "@xprng/markdown";
import { XpdDialogs } from "../services/dialogs";
import { XpdConfiguration } from "../services/configuration";
import { XpdNavigation } from "../services/navigation";

@Component({
  selector: "xpd-app",
  imports: [RouterOutlet, Markdown],
  host: {
    class: "pico",
    "(document:keydown.meta.s)": "dialogs.settings($event)",
    "(document:keydown.meta.h)": "dialogs.help($event)",
    "(document:keydown.Esc)": "dialogs.clear($event)",
    "[style.--xpd-body-height]": '"100vh"',
  },
  template: `
    @if (showHelp()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="dialogs.clear()"></button>
            <h4>Help</h4>
            <p>Help for yet another documentation app</p>
          </header>
          <xpr-markdown [src]="helpSrc"/>
        </article>
      </dialog>
    }
    @if (showSettings()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="dialogs.clear()"></button>
            <h4>Settings</h4>
          </header>
          <p>Settings comes here....</p>
        </article>
      </dialog>
    }
    <router-outlet/>
  `,
})
export class XpdApp {
  protected readonly nav = inject(XpdNavigation);
  protected readonly dialogs = inject(XpdDialogs);
  protected readonly helpSrc = inject(XpdConfiguration).help;

  protected readonly showHelp = computed(() => this.nav.booleanParam("help"));
  protected readonly showSettings = computed(() =>
    this.nav.booleanParam("settings")
  );
}
