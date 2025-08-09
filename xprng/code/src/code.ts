import { Component, computed, inject, input } from "@angular/core";
import { httpResource } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import type { HighlighterCore } from "shiki";
import { getHighlighter } from "@xprng/vendor/shiki";

const ERROR_NONE =
  "Either 'code' or 'src' input must be provided. Neither is set.";
const ERROR_BOTH = "Either 'code' or 'src' input should be provided, not both.";

/**
 * # Code
 *
 * This component is used to display source code with syntax highlighting.
 * It can either take a string of code directly or fetch it from a remote source.
 *
 * ## Inputs
 *
 * - `code`: A string containing the source code to be displayed. Unable to be used with `src`.
 * - `src`: A URL from which to fetch the source code. Unable to be used with `code`.
 * - `lang`: The programming language of the source code. This should be a valid language identifier supported by Shiki.
 * - `theme`: The theme to use for syntax highlighting. This can be any theme supported by Shiki.
 * - `highlighter`: A custom highlighter function (Should be an instance of Shiki's `HighlighterCore`).
 *
 * ## Nested Content
 *
 * The component supports nested content for different states, loading, error, and empty states.
 * See the example below for how to use these states.
 *
 * ## Examples
 *
 * ### Importing the component
 *
 * ```typescript
 * import { Code } from "@xprng/code";
 * ```
 *
 * ### Importing states directives
 *
 * ```typescript
 * import { LoadingState, ErrorState, EmptyState } from "@xprng/common";
 * ```
 *
 * ### Directly providing code content
 *
 * ```html
 * <xpr-code [code]="myCode" lang="javascript" theme="nord"></xpr-code>
 * ```
 *
 * ### Fetching code from a remote source
 *
 * ```html
 * <xpr-code src="https://example.com/my-code.js" lang="javascript" theme="nord"></xpr-code>
 * ```
 *
 * ### Using nested content for different states
 * ```html
 * <xpr-code src="https://example.com/my-code.js" lang="javascript" theme="nord">
 *   <xpr-loading-state>Loading...</xpr-loading-state>
 *   <xpr-error-state>Error loading code.</xpr-error-state>
 *   <xpr-empty-state>No code available.</xpr-empty-state>
 * </xpr-code>
 * ```
 */
@Component({
  selector: "xpr-code",
  host: {
    "[style.display]": '"block"',
    class: "xpr-code",
  },
  template: `
    @if (code()) {
      <div class="xpr-value xpr-local" [innerHTML]="content()"></div>
    }
    @if (src()) {
      @switch (res.status()) {
        @case ("error") {
          <ng-content select="xpr-error-state"></ng-content>
        }
        @case ("loading") {
          <ng-content select="xpr-loading-state"></ng-content>
        }
        @case ("resolved") {
          <div class="xpr-value xpr-loaded" [innerHTML]="content()"></div>
        }
        @default {
          <ng-content select="xpr-empty-state"></ng-content>
        }
      }
    }
  `,
})
export class Code {
  /**
   * Source code content as a string
   * This can be used to directly provide source code content.
   * If this is set, the `src` attribute will be ignored.
   * @input
   */
  readonly code = input<string | undefined>();

  /**
   * The source URL of the source code content.
   * This is optional and can be used to fetch source code content from a URL.
   * @input
   */
  readonly src = input<string | undefined>();

  /**
   * The programming language of the source code.
   * This should be a valid language identifier supported by Shiki.
   * @see https://shiki.style/languages
   * @input
   */
  readonly lang = input<string>("javascript");

  /**
   * The theme to use for syntax highlighting.
   * This can be any theme supported by Shiki.
   * @see https://shiki.style/themes
   * @input
   */
  readonly theme = input<string>("nord");

  /**
   * A custom highlighter function (Should be an instance of Shiki's `HighlighterCore`).
   * @input
   */
  readonly highlighter = input<HighlighterCore | undefined>();

  //

  protected content = computed(() => {
    if (!this.code() && !this.src()) {
      throw new Error(ERROR_NONE);
    }
    if (this.code() && this.src()) {
      throw new Error(ERROR_BOTH);
    }

    const parse = (text: string) =>
      this.sanitize.bypassSecurityTrustHtml(
        getHighlighter().codeToHtml(text, {
          lang: this.lang(),
          theme: this.theme(),
        }).toString(),
      );

    if (this.code()) return parse(this.code() ?? "");

    if (this.src()) {
      return parse(this.res.hasValue() ? this.res.value() : "");
    }

    return parse("");
  });

  protected readonly res = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);
}
