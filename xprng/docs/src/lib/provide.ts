import {inject, InjectionToken, provideAppInitializer} from "@angular/core";
import {DocDescriptor} from "./descriptor";
import {Routes} from "@angular/router";
import {ConfigurationOptions, XpdConfiguration} from "./services/configuration";
import {PlatformLocation} from '@angular/common';

export const XpdDescriptorsToken = new InjectionToken("XpdDescriptors");
export const XpdRoutesToken = new InjectionToken("XpdRoutes");

export function provideDescriptors(descriptors: DocDescriptor[]) {
  return {
    provide: XpdDescriptorsToken,
    useValue: descriptors,
  };
}

export function provideRoutes(routes: Routes) {
  return {
    provide: XpdRoutesToken,
    useValue: routes,
  };
}

export function provideConfig(config: Partial<ConfigurationOptions>) {
  return provideAppInitializer(() => {
    const base = inject(PlatformLocation).getBaseHrefFromDOM();
    if (config?.logo) {
      config.logo = base + config.logo;
    }
    if (config?.help) {
      config.help = base + config.help;
    }
    inject(XpdConfiguration).conf.set(config);
  });
}
