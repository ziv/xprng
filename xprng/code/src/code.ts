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
    @switch (state()) {
      @case ("local") {
        <div [innerHTML]="content()"
             class="xpr-value xpr-local"></div>
      }
      @case ("error") {
        <ng-content select="xpr-error-state"/>
      }
      @case ("loading") {
        <ng-content select="xpr-loading-state"/>
      }
      @case ("resolved") {
        <div [innerHTML]="content()"
             class="xpr-value xpr-loaded"></div>
      }
      @default {
        <ng-content select="xpr-empty-state"/>
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

  protected state = computed(() => {
    if (this.code()) return "local";
    if (this.src()) return this.res.status();
    return "empty";
  });

  protected content = computed(() => {
    const code = this.code() as string;
    const src = this.src() as string;

    if (!code && !src) {
      throw new Error(ERROR_NONE);
    }
    if (code && src) {
      throw new Error(ERROR_BOTH);
    }

    const parse = (text: string) =>
      this.sanitize.bypassSecurityTrustHtml(
        getHighlighter().codeToHtml(text, {
          lang: this.lang(),
          theme: this.theme(),
        }).toString(),
      );

    if (code) return parse(code as string);

    if (this.res.hasValue()) {
      return parse(this.res.value());
    }

    return parse("");
  });

  private readonly res = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);
}
