import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, JsonPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { marked } from 'marked';
import { DecisionController } from './decision';

// todo remove from here!
marked.use({mangle: false, headerIds: false});

export interface Question {
  content: string;
  options?: Question[];
  resource?: string;
  result?: boolean;
}

@Component({
  standalone: true,
  selector: 'xpr-decision-tree-resource',
  template: '<article [innerHTML]="html"></article>',
  imports: [HttpClientModule],
})
export class DecisionTreeResource {
  loading = false;
  html: SafeHtml = '';

  @Input() marked = marked;

  @Input() set src(url: string) {
    this.loading = true;
    this.http.get(url, {responseType: 'text'}).subscribe(text => {
      this.loading = false;
      this.content = text;
    });
  }

  @Input() set content(text: string) {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.marked.parse(text));
  }

  constructor(private readonly http: HttpClient,
              private readonly sanitizer: DomSanitizer) {
  }
}

@Component({
  standalone: true,
  selector: 'xpr-decision-tree',
  imports: [NgIf, NgFor, NgSwitch, NgSwitchCase, DecisionTreeResource, AsyncPipe, JsonPipe],
  template: `
    <ng-container *ngIf="ctrl?.current$ | async as node">
      <ng-container [ngSwitch]="node.type">
        <ng-container *ngSwitchCase="'text'">{{node.text}}</ng-container>
        <ng-container *ngSwitchCase="'url'">{{node.url}}</ng-container>
        <ng-container *ngSwitchCase="'options'">
          <section *ngFor="let sub of node.options">
            <button (click)="ctrl?.select(sub)">{{sub.title}}</button>
          </section>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class DecisionTree {
  @Input() ctrl?: DecisionController;
}
