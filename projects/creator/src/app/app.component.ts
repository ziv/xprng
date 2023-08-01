import { Component, OnInit } from '@angular/core';
import { SampleForm } from './components/sample-form';
import Styler, { InputType } from './services/styler';
import { NgFor } from '@angular/common';


@Component({
  selector: 'creator-root',
  standalone: true,
  imports: [
    NgFor,
    SampleForm
  ],
  template: `
    <h1>Theme Creator</h1>
    <div>
      <creator-sample-form></creator-sample-form>
      <ul>
        <li *ngFor="let input of styler.inputs">{{input[0]}}</li>
      </ul>
      <button (click)="change()" data-color="accent">Change</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  styler = new Styler([
    ['color-initial', [InputType.Color]]
  ]);

  ngOnInit() {
  }

  change() {
    this.styler.update();
  }
}
