import {computed, Directive, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {DocDescriptor, Prop} from '../descriptor';
import {XpdShared} from '../services/shared';
import {XpdDescriptorsToken} from '../provide';

@Directive({})
export abstract class XpdWrap {
  readonly props = signal<Record<string, any>>({});

  prop<T>(id: string): T {
    return this.props()?.[id] as T;
  }

  protected constructor() {
    window.addEventListener('message', e => {
      if (e.origin !== window.location.origin) {
        return; // listen of the same origin only
      }
      if (e.data && e.data.type === 'update' && e.data.params) {
        const params = JSON.parse(e.data.params);
        console.log('Received update from iframe:', params);
        this.props.set(params);
      }
    });
  }
}
