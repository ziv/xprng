import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'xpr-expansion',
  imports: [NgIf],
  template: `
      <details>
          <ng-container (click)="toggle()">
              <ng-content select="summary"></ng-content>
          </ng-container>
          <div *ngIf="open">
              <ng-content></ng-content>
          </div>
      </details>`
})
export class Expansion {
  @Input() open = false;
  @Input() summary = '';

  toggle() {
    this.open = !this.open;
  }
}
