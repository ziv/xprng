import { Component, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked, marked } from 'marked';
import { mergeMap } from 'rxjs';

export type Parser = (raw: string) => string;

function loadMarked() {
  return import('marked');
}

@Component({
  standalone: true,
  selector: 'xpr-dt-text',
  imports: [HttpClientModule],
  template: '<article class="xpr-text" [innerHTML]="html"></article>',
})
export class XprDtText {
  loading = false;
  html?: SafeHtml;

  @Input() parser?: Parser;

  @Input() set src(url: string) {
    this.loading = true;
    this.http.get(url, {responseType: 'text'}).pipe(
      mergeMap(raw => loadMarked().then(m => m.parse(raw)))
    ).subscribe(raw => {
      this.content = raw;
      this.loading = false;
    });
  }

  @Input() set content(raw: string) {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.parser ? this.parser(raw) : raw);
  }

  constructor(private readonly http: HttpClient,
              private readonly sanitizer: DomSanitizer) {
  }
}
