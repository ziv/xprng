import {effect, inject, Injectable, InjectionToken, signal} from '@angular/core';

export type ConfigurationOptions = {
  // Colors
  primaryColor: string;
  secondaryColor: string;

  // URLs
  homeHeader: string;
  homeFooter: string;
}

function isClient() {
  return "localStorage" in globalThis;
}

export const CONFIGURATION_TOKEN = new InjectionToken('configuration');

@Injectable({providedIn: 'root'})
export class Configuration {
  private readonly defaults = inject(CONFIGURATION_TOKEN, {optional: true});
  readonly conf = signal<Partial<ConfigurationOptions>>(this.defaults ?? {});

  constructor() {
    effect(() => {
      if (isClient()) {
        localStorage.setItem('configuration', JSON.stringify(this.conf()));
      }
    });
  }
}


//
// const DefaultConfiguration: ConfigurationOptions = {
//   primaryColor: '#6491ff',
//   secondaryColor: '#a6e162',
//   homeHeader: '/internal/home-header.md',
//   homeFooter: '/internal/home-footer.md',
// };
// function read() {
//   if (!isClient()) {
//     return {};
//   }
//   const raw = localStorage.getItem('configuration');
//   if (!raw) {
//     console.log('No configuration found.');
//     return DefaultConfiguration;
//   }
//   try {
//     console.log(JSON.parse(raw));
//     return JSON.parse(raw);
//   } catch (e) {
//     return DefaultConfiguration;
//   }
// }
