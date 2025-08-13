import {Component, computed, inject, input, OnInit} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import type {MarkedOptions} from "marked";
import {marked} from "@xprng/vendor/marked";

/**
 * Marked options for parsing markdown.
 * @see https://marked.js.org/using_advanced#options
 */
export type MarkdownOptions = MarkedOptions;

@Component({
  selector: "xpr-markdown",
  host: {
    "[style.display]": '"block"',
    class: "xpr-markdown",
  },
  template: `
    @if (md()) {
      <!--
      Markdown content is provided directly mode.
      -->
      <div class="xpr-value xpr-local" [innerHTML]="content()"></div>

    } @else if (src()) {
      <!--
      Source URL is provided mode.
      -->
      @if (res.hasValue() && res.value()) {
        <div class="xpr-value xpr-loaded" [innerHTML]="content()"></div>
      } @else if (res.isLoading()) {
        <ng-content select="xpr-loading-state"/>
      } @else if (res.error()) {
        <ng-content select="xpr-error-state"/>
      } @else {
        <ng-content select="xpr-empty-state"/>
      }
    }
  `,
})
export class Markdown implements OnInit {
  /**
   * The markdown content to be rendered.
   * @input
   */
  readonly md = input<string | undefined>();

  /**
   * The source URL of the markdown content.
   * If `md` is provided, this will be ignored.
   * @input
   */
  readonly src = input<string | undefined>();

  /**
   * The theme to use for syntax highlighting.
   * @input
   */
  readonly theme = input<string>("github-light");

  /**
   * Options for the Maerked parser
   * @input
   */
  readonly options = input<Partial<MarkdownOptions>>({});

  //

  // protected mdContent = computed(() => this.content(this.md() ?? ""));
  protected content = computed(() => {
    return this.md()
      ? this.parse(this.md()!)
      : this.parse(this.res.hasValue() ? this.res.value() : "");
  });

  private parse(text: string) {
    const parser = marked(this.theme());
    return this.sanitize.bypassSecurityTrustHtml(
      parser.parse(text, this.options()) as string,
    );
  }

  protected readonly res = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);

  async ngOnInit() {
    if (!this.md() && !this.src()) {
      throw new Error(
        "Either 'md' or 'src' input must be provided. Neither provided.",
      );
    }
    if (this.md() && this.src()) {
      throw new Error(
        "Either 'md' or 'src' input must be provided. Both provided.",
      );
    }
  }
}
