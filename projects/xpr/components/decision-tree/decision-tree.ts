import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { marked } from 'marked';

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
  imports: [NgIf, NgFor, DecisionTreeResource],
  template: `
    <div class="tree">
      <ng-container *ngFor="let item of current">
        <section *ngIf="item.options" class="question">
          <button (click)="next(item.options)">{{item.content}}</button>
        </section>
        <section *ngIf="item.result" class="result">
          <xpr-decision-tree-resource *ngIf="item.resource"
                                      [src]="item.content"></xpr-decision-tree-resource>
          <xpr-decision-tree-resource *ngIf="!item.resource"
                                      [content]="item.content"></xpr-decision-tree-resource>
        </section>
      </ng-container>
    </div>
    <div class="actions" *ngIf="showReset || showBack">
      <button *ngIf="showBack && stack.length > 1" (click)="back()">back</button>
      <button *ngIf="showReset && stack.length > 1" (click)="reset()">reset</button>
    </div>
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
  stack: Question[][] = [];

  get current() {
    return this.stack[this.stack.length - 1];
  }

  @Input() showBack = true;
  @Input() showReset = true;

  @Input() set tree(tree: Question[]) {
    this.next(tree);
  }

  next(tree?: Question[]) {
    if (tree) {
      this.stack.push(tree);
    }
  }

  back() {
    this.stack = this.stack.slice(0, this.stack.length - 1);
  }

  reset() {
    this.stack = [this.stack[0]];
  }
}
