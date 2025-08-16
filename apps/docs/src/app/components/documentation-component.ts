import {Directive, effect, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {DocDescriptor, Prop} from '../descriptor';
import XpdShared from '../services/shared';

@Directive({})
export abstract class XpdDocumentationComponent {
  protected readonly sharedData = inject(XpdShared);

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

  propValue(id: string): unknown {
    return this.prop(id).value;
  }

  protected constructor() {
    effect(() => {
      this.sharedData.component.set(this.componentDescriptor() ?? {});
    });
    effect(() => {
      this.sharedData.queryParams.set(this.queryParams() ?? {});
    });
  }

  private readonly queryParams = toSignal(inject(ActivatedRoute).queryParams);
  private readonly componentDescriptor = toSignal(inject(ActivatedRoute).data.pipe(map(data => data['component'] as DocDescriptor)));
}
