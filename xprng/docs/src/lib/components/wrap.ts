import {Directive, signal} from "@angular/core";

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
    window.addEventListener("message", (e) => {
      if (e.origin !== window.location.origin) {
        return; // listen of the same origin only
      }
      if (e.data && e.data.type === "update" && e.data.params) {
        try {
          const params = JSON.parse(e.data.params);
          this.props.set(params);
        } catch (err) {
          console.error('unable to parse update request', err);
        }
      }
    });
  }
}
