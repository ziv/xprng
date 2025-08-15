import {Directive, effect, inject, InjectionToken} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {DocDescriptor, Prop} from '@xprng/docs';
import SharedData from '../services/shared-data';

export const DocsHost = new InjectionToken('DocsHost');

@Directive({})
export abstract class DocumentationComponent {
  protected readonly sharedData = inject(SharedData);

  // private readonly parent = inject<{ component: WritableSignal<any> }>(DocsHost, {optional: true});

  get props() {
    return this.sharedData.props();
  }

  prop(id: string): Prop {
    const p = this.props.find(d => d.id === id);
    if (!p) {
      throw new Error(`Property with id "${id}" not found in descriptor.`);
    }
    return p as Prop;
  }

  protected constructor() {
    effect(() => {
      this.sharedData.component.set(this.componentDescriptor() ?? {});
      // if (this.parent && this.componentDescriptor()) {
      //   this.parent.component.set(this.componentDescriptor());
      // }
    });

    effect(() => {
      this.sharedData.queryParams.set(this.queryParams() ?? {});
    });
  }

  private readonly queryParams = toSignal(inject(ActivatedRoute).queryParams);
  private readonly componentDescriptor = toSignal(inject(ActivatedRoute).data.pipe(map(data => data['component'] as DocDescriptor)));
}
