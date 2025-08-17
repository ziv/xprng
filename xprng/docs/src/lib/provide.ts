import {InjectionToken} from '@angular/core';
import {DocDescriptor} from './descriptor';


export const XpdDescriptorsToken = new InjectionToken('XpdDescriptors');

export function provideDescriptors(descriptors: DocDescriptor[]) {
  return {
    provide: XpdDescriptorsToken,
    useValue: descriptors,
  };
}
