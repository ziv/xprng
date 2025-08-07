import {
  AfterContentInit,
  AfterViewInit,
  Component,
  computed,
  contentChild,
  Directive,
  effect,
  inject,
  input,
  OnInit,
  untracked,
  viewChild,
  ViewContainerRef,
} from "@angular/core";
import { httpResource } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import DOMPurify, { Config } from "dompurify";
import { marked, type MarkedOptions } from "marked";
import { NgComponentOutlet } from "@angular/common";

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
  host: {
    "[style.display]": '"block"',
    class: "xpr-markdown",
  },
  template: `
    @if (markdownSource.error()) {
      <ng-content select="xpr-markdown-error"></ng-content>
    } @else if (markdownSource.isLoading()) {
      <ng-content select="xpr-markdown-loading"></ng-content>
    } @else if (markdownSource.hasValue()) {
      <div class="xpr-markdown xpr-ok" [innerHTML]="markdown()"></div>
    }
  `,
  imports: [
    NgComponentOutlet,
  ],
})
export class Markdown {
  /**
   * The source URL of the markdown content.
   */
  readonly src = input.required<string>();

  /**
   * Options for parsing and sanitizing the markdown content.
   */
  readonly options = input<Partial<MarkdownOptions> | undefined | null>();

  //

  protected readonly markdown = computed(() => {
    // no value yet...
    if (!this.markdownSource.hasValue()) {
      return this.sanitize("");
    }

    // convert markdown to HTML
    const html = marked.parse(
      this.markdownSource.value(),
      (this.options()?.marked ?? {}) as MarkedOptions,
    ) as string;

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

  protected readonly markdownSource = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer).bypassSecurityTrustHtml.bind(
    inject(DomSanitizer),
  );
}

@Directive({
  selector: "xpr-markdown-loading,[xpr-markdown-loading]",
  exportAs: "xprMarkdownLoading",
  host: {
    class: "xpr-markdown xpr-loading",
  },
})
export class MarkdownLoading {
}

@Directive({
  selector: "xpr-markdown-error,[xpr-markdown-error]",
  exportAs: "xprMarkdownError",
  host: {
    class: "xpr-markdown xpr-error",
  },
})
export class MarkdownError {
}
