import {inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({providedIn: "root"})
export class XpdNavigation {
  private readonly router = inject(Router);
  readonly params = toSignal(this.router.routerState.root.queryParams);


  merge(key: string, value: unknown): void;
  merge(obj: { [key: string]: unknown }): void;
  merge(arr: [string, unknown][]): void;
  merge(
    arg1: string | { [key: string]: unknown } | [string, unknown][],
    value?: unknown,
  ): void {
    console.log(arg1);
    this.router.navigate([], {
      queryParams: this.build(arg1, value),
      queryParamsHandling: "merge",
    }).catch(console.error);
  }

  replace(key: string, value: unknown): void;
  replace(obj: { [key: string]: unknown }): void;
  replace(arr: [string, unknown][]): void;
  replace(
    arg1: string | { [key: string]: unknown } | [string, unknown][],
    value?: unknown,
  ): void {
    this.router.navigate([], {
      queryParams: this.build(arg1, value),
      queryParamsHandling: "replace",
    }).catch(console.error);
  }

  private build(
    arg1: string | { [key: string]: unknown } | [string, unknown][],
    value?: unknown,
  ) {
    if (Array.isArray(arg1)) {
      return Object.fromEntries(arg1);
    }
    if (typeof arg1 === "object") {
      return arg1;
    }
    if (value !== undefined) {
      return {[arg1]: value};
    }
    throw new Error("Invalid arguments for build method");
  }
}
