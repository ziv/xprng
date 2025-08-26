import { Directive, signal } from "@angular/core";
import { debugLog } from "../utils";

@Directive({})
export abstract class XpdWrap {
  readonly props = signal<Record<string, any>>({});

  prop<T>(id: string): T {
    return this.props()?.[id] as T;
  }

  notify(e: Event) {
    console.info("Notify", e);
  }

  protected constructor() {
    window.addEventListener("storage", () => {
      const name = window.location.hash.split("/").pop();
      if (!name) {
        debugLog("No component name found in URL hash.");
        return;
      }
      const raw = localStorage.getItem("__xpd-properties");
      try {
        const params = JSON.parse(raw ?? "{}");
        debugLog("params read", params);
        if (name in params) {
          this.props.set(params[name]);
        } else {
          debugLog(
            `No properties found for component "${name}" in localStorage.`,
          );
        }
      } catch (err) {
        debugLog("unable to parse update request", err);
      }
    });
  }
}
