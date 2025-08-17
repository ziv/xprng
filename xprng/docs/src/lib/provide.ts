import { InjectionToken } from "@angular/core";
import { DocDescriptor } from "./descriptor";
import { Routes } from "@angular/router";
import { ConfigurationOptions } from "./services/configuration";

export const XpdDescriptorsToken = new InjectionToken("XpdDescriptors");
export const XpdRoutesToken = new InjectionToken("XpdRoutes");
export const XpdConfigToken = new InjectionToken("XpdConfig");

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
  return {
    provide: XpdConfigToken,
    useValue: config,
  };
}
