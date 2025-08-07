import {Component, computed, inject, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import DOMPurify, {Config} from "dompurify";
import {marked, type MarkedOptions} from "marked";

export type MarkdownOptions = {
  /**
   * Marked options for parsing markdown.
   * @see https://marked.js.org/using_advanced#options
   */
  marked: MarkedOptions;

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
};

@Component({
  selector: "xpr-markdown",
  template: `
    @if (markdownSource.error()) {
      <!--
      display error message if markdown source fails to load
      -->
      <div class="xpr-markdown xpr-error">{{ this.errmsg() }}</div>
      <!--
      -->
    } @else if (markdownSource.isLoading()) {
      <!--
      display loading message while markdown source is being fetched
      -->
      <div class="xpr-markdown xpr-loading">{{ this.loading() }}</div>
      <!--
      -->
    } @else if (markdownSource.hasValue()) {
      <!--
      display the markdown content once it is successfully loaded
      -->
      <div class="xpr-markdown xpr-value" [innerHTML]="markdown()"></div>
      <!--
      -->
    }
  `,
})
export default class Markdown {
  readonly options = input<MarkdownOptions | undefined | null>();
  readonly src = input.required<string>();
  readonly errmsg = input<string>('');
  readonly loading = input<string>('');

  protected readonly markdown = computed(() => {
    // no value yet...
    if (!this.markdownSource.hasValue()) {
      return this.sanitize('');
    }
    const html = marked.parse(this.markdownSource.value(), (this.options()?.marked ?? {}) as MarkedOptions) as string;

    // another layer of sanitization
    if (this.options()?.sanitize) {
      return this.sanitize(
        DOMPurify.sanitize(
          html,
          this.options()?.dompurify ?? {},
        ).toString(),
      );
    }
    return this.sanitize(html);
  });

  private readonly sanitize = inject(DomSanitizer).bypassSecurityTrustHtml.bind(inject(DomSanitizer));
  protected readonly markdownSource = httpResource.text(() => this.src());
}
