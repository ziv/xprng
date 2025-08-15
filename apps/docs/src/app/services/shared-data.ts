import {computed, Injectable, signal} from '@angular/core';
import type {DocDescriptor} from '@xprng/docs';

export type QueryParams = { [key: string]: string | string[] };

@Injectable({providedIn: 'root'})
export default class SharedData {

  component = signal<Partial<DocDescriptor>>({});

  queryParams = signal<QueryParams>({});

  notification = signal<unknown>(null);

  // accessors

  props = computed(() => this.component()?.props ?? []);
}
