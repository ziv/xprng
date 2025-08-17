import {
  effect,
  inject,
  Injectable,
  InjectionToken,
  signal,
} from "@angular/core";
import { PlatformLocation } from "@angular/common";
import { Routes } from "@angular/router";
import { XpdConfigToken, XpdRoutesToken } from "../provide";

export type ConfigurationOptions = {
  help: string;
  navigation: { label: string; route: string }[];
};

function isClient() {
  return "localStorage" in globalThis;
}

function read(
  defaults: Partial<ConfigurationOptions>,
): Partial<ConfigurationOptions> {
  if (!isClient()) {
    return defaults;
  }
  const raw = localStorage.getItem("configuration");
  if (!raw) {
    console.log("No configuration found.");
    return defaults;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return defaults;
  }
}

@Injectable({ providedIn: "root" })
export class XpdConfiguration {
  private readonly base = inject(PlatformLocation).getBaseHrefFromDOM();

  private readonly defaults = inject<ConfigurationOptions>(XpdConfigToken, {
    optional: true,
  });
  private readonly routes = inject<Routes>(XpdRoutesToken, { optional: true });

  readonly conf = signal<Partial<ConfigurationOptions>>(
    read(this.defaults ?? {}),
  );

  get help() {
    return this.base + (this.conf().help ?? "internal/help.md");
  }

  get items() {
    return (this.routes ?? []).map((r) => ({
      label: r.title ?? "Unknown",
      route: `/app/docs/${r.path}`,
    }));
  }

  constructor() {
    effect(() => {
      if (isClient()) {
        localStorage.setItem("configuration", JSON.stringify(this.conf()));
      }
    });
  }
}
