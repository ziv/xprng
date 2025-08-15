import {computed, Injectable, signal} from '@angular/core';
import type {DocDescriptor} from '../descriptor';

export type QueryParams = { [key: string]: string | string[] };

@Injectable({providedIn: 'root'})
export default class XpdShared {

  component = signal<Partial<DocDescriptor>>({});

  queryParams = signal<QueryParams>({});

  notification = signal<unknown>(null);

  // accessors

  props = computed(() => this.component()?.props ?? []);

  queryParam(key: string): string | string[] | undefined {
    return this.queryParams()[key];
  }
}
