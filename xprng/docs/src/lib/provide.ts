import {inject, provideAppInitializer} from "@angular/core";
import {ConfigurationOptions, XpdConfiguration} from "./services/configuration";
import {PlatformLocation} from '@angular/common';

export function provideConfig(config: Partial<ConfigurationOptions>) {
  return provideAppInitializer(() => {
    const base = inject(PlatformLocation).getBaseHrefFromDOM();
    if (config?.logo && !config.logo.startsWith('http')) {
      config.logo = base + config.logo;
    }
    if (config?.help && !config.help.startsWith('http')) {
      config.help = base + config.help;
    }
    inject(XpdConfiguration).conf.set(config);
  });
}
