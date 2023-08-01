import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecisionTree, Question } from '../../../xpr/components/decision-tree';
import { HttpClientModule } from '@angular/common/http';

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
    <h1>Demo</h1>
    <xpr-decision-tree [tree]="data"></xpr-decision-tree>
  `,
  styles: [
    `

    `
  ],
})
export class AppComponent {
  data: Question[] = [
    {
      content: 'Start',
      options: [
        {
          content: 'I want to replace a secret',
          options: [
            {
              content: 'I want to replace a unique secret',
              options: []
            },
            {
              content: 'I want to replace a shared secret',
              options: []
            },
            {
              content: 'I want to check if my secret is unique or shared',
              options: [
                {
                  content: '/assets/check-for-unique-or-shared.md',
                  resource: '/assets/check-for-unique-or-shared.md',
                  result: true
                }
              ]
            }
          ]
        }
      ],
    }
  ];
}
