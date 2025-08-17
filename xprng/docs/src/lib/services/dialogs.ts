import { inject, Injectable } from "@angular/core";
import { XpdNavigation } from "./navigation";

function clear(e?: Event) {
  if (!e) {
    return;
  }
  e.stopPropagation();
  e.preventDefault();
}

@Injectable({ providedIn: "root" })
export class XpdDialogs {
  private readonly nav = inject(XpdNavigation);

  minimize(minimize: boolean) {
    this.nav.merge({ minimize });
  }

  help(e?: Event) {
    clear(e);
    this.nav.merge({ help: true });
  }

  settings(e?: Event) {
    clear(e);
    this.nav.merge({ settings: true });
  }

  clear(e?: Event) {
    clear(e);
    this.nav.merge({ settings: false, help: false });
  }
}
