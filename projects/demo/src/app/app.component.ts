import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecisionTree, Question } from '../../../xpr/components/decision-tree';
import { HttpClientModule } from '@angular/common/http';
import { DecisionController, DecisionNode } from '../../../xpr/components/decision-tree/decision';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    DecisionTree,
    HttpClientModule,
  ],
  template: `
    <h1>Decision Tree</h1>
    <xpr-decision-tree [ctrl]="ctrl"></xpr-decision-tree>
    <button (click)="ctrl.back()" *ngIf="ctrl.stack.length > 1">Back</button>
  `,
  styles: [
    `

    `
  ],
})
export class AppComponent {
  ctrl: DecisionController = new DecisionController({
    type: 'options',
    title: 'start',
    options: [
      {
        type: 'options',
        title: 'I want to change a single owned secret',
        options: [
          {
            type: 'text',
            title: 'I want to change Mongo secret',
            text: 'Do x and y and go to z... ad asdf adsf sdf sdf sdf sdfs dfsdf sdf ssd fsd f'
          },
          {
            type: 'options',
            title: 'I want to change Redis secret',
            options: []
          },
          {
            type: 'options',
            title: 'I want to change 3rd party secret',
            options: []
          },
        ]
      },
      {
        type: 'options',
        title: 'I want to change a shared owned secret',
        options: []
      },
      {
        type: 'options',
        title: 'I want to determine if my secret has a single or shared ownership',
        options: [
          {
            type: 'text',
            title: ''
          }
        ]
      }
    ]
  });
}
