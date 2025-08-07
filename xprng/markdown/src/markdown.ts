import {Component, computed, inject, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import DOMPurify, {Config} from 'dompurify';
import {marked, type MarkedOptions} from 'marked';

export type MarkdownOptions = {
  /**
   * Marked options for parsing markdown.
   * @see https://marked.js.org/using_advanced#options
   */
  marked: MarkedOptions

  /**
   * DOMPurify configuration for sanitizing HTML.
   * @see https://github.com/cure53/DOMPurify
   */
  dompurify: Config;

  /**
   * Whether to sanitize the output HTML.
   * If true, the output will be sanitized using DOMPurify.
   */
  sanitize: boolean;
}

@Component({
  selector: 'xpr-markdown',
  template: '<div class="markdown" [innerHTML]="markdown()"></div>',

})
export class Markdown {
  readonly options = input<any>();
  readonly src = input.required<string>();
  readonly err = input<string | null>(null);

  protected readonly markdown = computed(() => {
    const sanitize = this.sanitizer.bypassSecurityTrustHtml.bind(this.sanitizer);

    if (this.markdownSource.error()) {
      return sanitize(this.markdownSource.error()?.message ?? 'Error loading markdown');
    }

    if (!this.markdownSource.hasValue()) {
      return sanitize('Loading markdown...');
    }

    const html = marked.parse(this.markdownSource.value()) as string;

    // another layer of sanitization
    if (this.options()?.sanitize) {
      return sanitize(DOMPurify.sanitize(html, this.options()?.dompurify ?? {}) as unknown as string);
    }

    return sanitize(html);
  });

  private readonly sanitizer = inject(DomSanitizer);
  private readonly markdownSource = httpResource.text(() => this.src());
}
