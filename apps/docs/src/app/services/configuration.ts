import {effect, inject, Injectable, InjectionToken, signal,} from "@angular/core";
import {PlatformLocation} from '@angular/common';
import {Routes} from '@angular/router';

export type ConfigurationOptions = {
  logo: string;
  help: string;
};

function isClient() {
  return "localStorage" in globalThis;
}

export const CONFIGURATION_TOKEN = new InjectionToken("configuration");
export const ROUTES_TOKEN = new InjectionToken("routes");

function read(defaults: Partial<ConfigurationOptions>): Partial<ConfigurationOptions> {
  if (!isClient()) {
    return defaults;
  }
  const raw = localStorage.getItem('configuration');
  if (!raw) {
    console.log('No configuration found.');
    return defaults;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return defaults;
  }
}

@Injectable({providedIn: "root"})
export class XpdConfiguration {
  private readonly base = inject(PlatformLocation).getBaseHrefFromDOM();
  private readonly defaults = inject<ConfigurationOptions>(CONFIGURATION_TOKEN, {optional: true});
  private readonly routes = inject<Routes>(ROUTES_TOKEN, {optional: true});

  readonly conf = signal<Partial<ConfigurationOptions>>(read(this.defaults ?? {}));

  get logo() {
    return this.base + (this.conf().logo ?? 'logosh.svg');
  }

  get help() {
    return this.base + (this.conf().help ?? 'internal/help.md');
  }

  get items() {
    return (this.routes ?? []).map(r => ({label: r.title ?? 'Unknown', route: `/docs/${r.path}`}));
  }

  constructor() {
    effect(() => {
      if (isClient()) {
        localStorage.setItem("configuration", JSON.stringify(this.conf()));
      }
    });
  }
}
