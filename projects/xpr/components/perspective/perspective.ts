import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'xpr-perspective',
  imports: [NgIf],
  template: `<div class="xpr-perspective" *ngIf="open" [title]="title"><ng-content></ng-content></div>`
})
export class Perspective {
  @ContentChildren(Perspective) perspectives?: QueryList<Perspective>;

  @Input() title: string = '';
  @Input() open: boolean = true;
}
