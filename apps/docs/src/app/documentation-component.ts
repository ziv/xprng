import {Directive, effect, inject, InjectionToken, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {DocDescriptor, Prop} from '@xprng/docs';

export const DocsHost = new InjectionToken('DocsHost');

// @Directive({})
export abstract class DocumentationComponent {
  private readonly routeDescriptor = toSignal(inject(ActivatedRoute).data.pipe(map(data => data['component'] as DocDescriptor)));
  private readonly parent = inject<{ component: WritableSignal<any> }>(DocsHost, {optional: true});

  get props() {
    return this.routeDescriptor()?.props ?? [];
  }

  prop(id: string): Prop {
    const p = this.props.find(d => d.id === id);
    if (!p) {
      throw new Error(`Property with id "${id}" not found in descriptor.`);
    }
    return p as Prop;
  }

  notify(msg: unknown) {

  }

  protected constructor() {
    effect(() => {
      if (this.parent && this.routeDescriptor()) {
        this.parent.component.set(this.routeDescriptor());
      }
    });
  }
}
