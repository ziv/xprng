import {computed, Directive, effect, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {DocDescriptor, Prop} from '../descriptor';
import {XpdShared} from '../services/shared';
import {XpdDescriptorsToken} from '../provide';

@Directive({})
export abstract class XpdDocumentationComponent {
  readonly props = toSignal(inject(ActivatedRoute).queryParams);

  prop(id: string) {
    return this.props()?.[id];
  }
}
