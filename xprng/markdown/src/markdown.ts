import {Component, computed, inject, input,} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {marked, type MarkedOptions} from "marked";

export type MarkdownOptions = {
  /**
   * Marked options for parsing markdown.
   * @see https://marked.js.org/using_advanced#options
   */
  marked: MarkedOptions;
};

@Component({
  selector: "xpr-markdown",
  host: {
    "[style.display]": '"block"',
    class: "xpr-markdown",
  },
  template: `
    @if (md()) {
      <div class="xpr-value" [innerHTML]="markdown()"></div>
    } @else if (markdownSource.error()) {
      <ng-content select="xpr-error-state"></ng-content>
    } @else if (markdownSource.isLoading()) {
      <ng-content select="xpr-oading-state"></ng-content>
    } @else if (markdownSource.hasValue()) {
      <div class="xpr-value xpr-loaded" [innerHTML]="markdown()"></div>
    }
  `,
})
export class Markdown {
  /**
   * The markdown content to be rendered.
   */
  readonly md = input<string | undefined>();

  /**
   * The source URL of the markdown content.
   * If `md` is provided, this will be ignored.
   */
  readonly src = input<string | undefined>();

  /**
   * Options for the markdown content.
   */
  readonly options = input<Partial<MarkdownOptions> | undefined | null>();

  //

  /**
   * If attribute `md` is set, it will be used as the markdown content.
   * If attribute `src` is set, it will be used to fetch the markdown content.
   * If neither is set, the component will not render any content.
   * @protected
   */
  protected readonly markdown = computed(() => {
    let text = this.md() ?? "";
    if (!text && this.markdownSource.hasValue()) {
      text = this.markdownSource.value() ?? "";
    }
    const opts = this.options()?.marked ?? {};
    return this.sanitize.bypassSecurityTrustHtml(marked.parse(text, opts) as string);
  });

  protected readonly markdownSource = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);
}

