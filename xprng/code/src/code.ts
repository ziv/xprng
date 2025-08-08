import {Component, computed, inject, input,} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import shiki from './shiki';

export type Highlighter = (input: string, opts: { theme: string; lang: string; }) => string;

export type CodeOptions = {
  highlighter: Highlighter;
  theme?: string;
  lang?: string;
};

@Component({
  selector: "xpr-code",
  host: {
    "[style.display]": '"block"',
    class: "xpr-code",
  },
  template: `
    @if (code()) {
      <div class="xpr-value" [innerHTML]="content()"></div>
    } @else if (codeResource.error()) {
      <ng-content select="xpr-error-state"></ng-content>
    } @else if (codeResource.isLoading()) {
      <ng-content select="xpr-oading-state"></ng-content>
    } @else if (codeResource.hasValue()) {
      <div class="xpr-value xpr-loaded" [innerHTML]="content()"></div>
    }
  `,
})
export class Code {
  /**
   * Source code content as a string
   * This can be used to directly provide source code content.
   * If this is set, the `src` attribute will be ignored.
   */
  readonly code = input<string | undefined>();

  /**
   * The source URL of the source code content.
   * This is optional and can be used to fetch source code content from a URL.
   */
  readonly src = input<string | undefined>();

  /**
   * The programming language of the source code.
   * This should be a valid language identifier supported by Shiki.
   * @see https://shiki.style/languages
   */
  readonly lang = input<string>("javascript");

  /**
   * The theme to use for syntax highlighting.
   * This can be any theme supported by Shiki.
   * @see https://shiki.style/themes
   */
  readonly theme = input<string>("nord");

  /**
   * Options for the code content.
   * This can include a custom highlighter function and marked options.
   */
  readonly options = input<CodeOptions | undefined | null>();

  //

  /**
   * If attribute `code` is set, it will be used as the source content.
   * If attribute `src` is set, it will be used to fetch the source content.
   * If neither is set, the component will not render any content.
   * @protected
   */
  protected readonly content = computed(() => {
    let code = this.code() ?? "";
    if (!code && this.codeResource.hasValue()) {
      code = this.codeResource.value() ?? "";
    }
    const fn = (this.options()?.highlighter ?? shiki) as Highlighter;
    return this.sanitize.bypassSecurityTrustHtml(fn(code as string, {
      lang: this.options()?.lang ?? this.lang(),
      theme: this.options()?.theme ?? this.theme(),
    }).toString());
  });

  protected readonly codeResource = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);
}

