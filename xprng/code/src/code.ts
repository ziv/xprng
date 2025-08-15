import {Component, computed, inject, input} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import type {HighlighterCore} from "shiki";
import {getHighlighter} from "@xprng/vendor/shiki";
import {ContentSrc} from "@xprng/common";

const ERROR_NONE =
  "Either 'content' or 'src' input must be provided. Neither is set.";
const ERROR_BOTH =
  "Either 'content' or 'src' input should be provided, not both.";

/**
 * # Code
 *
 * This component is used to display source content with syntax highlighting.
 * It can either take a string of content directly or fetch it from a remote source.
 *
 * ## Inputs
 *
 * - `content`: A string containing the source content to be displayed. Unable to be used with `src`.
 * - `src`: A URL from which to fetch the source content. Unable to be used with `content`.
 * - `lang`: The programming language of the source content. This should be a valid language identifier supported by Shiki.
 * - `theme`: The theme to use for syntax highlighting. This can be any theme supported by Shiki.
 * - `highlighter`: A custom highlighter function (Should be an instance of Shiki's `HighlighterCore`).
 *
 * ## Nested Content
 *
 * The component supports nested code for different states, loading, error, and empty states.
 * See the example below for how to use these states.
 *
 * ## Examples
 *
 * ### Importing the component
 *
 * ```typescript
 * import { Code } from "@xprng/content";
 * ```
 *
 * ### Importing states directives
 *
 * ```typescript
 * import { LoadingState, ErrorState, EmptyState } from "@xprng/common";
 * ```
 *
 * ### Directly providing content code
 *
 * ```html
 * <xpr-content [content]="myCode" lang="javascript" theme="nord"></xpr-content>
 * ```
 *
 * ### Fetching content from a remote source
 *
 * ```html
 * <xpr-content src="https://example.com/my-code.js" lang="javascript" theme="nord"></xpr-content>
 * ```
 *
 * ### Using nested code for different states
 * ```html
 * <xpr-content src="https://example.com/my-code.js" lang="javascript" theme="nord">
 *   <xpr-loading-state>Loading...</xpr-loading-state>
 *   <xpr-error-state>Error loading content.</xpr-error-state>
 *   <xpr-empty-state>No content available.</xpr-empty-state>
 * </xpr-content>
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
        <div [innerHTML]="code()"
             class="xpr-value xpr-local"></div>
      }
      @case ("error") {
        <ng-content select="xpr-error-state"/>
      }
      @case ("loading") {
        <ng-content select="xpr-loading-state"/>
      }
      @case ("resolved") {
        <div [innerHTML]="code()"
             class="xpr-value xpr-loaded"></div>
      }
      @default {
        <ng-content select="xpr-empty-state"/>
      }
    }
  `,
})
export class Code extends ContentSrc {
  /**
   * The programming language of the source content.
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
    if (this.content()) return "local";
    if (this.src()) return this.res.status();
    return "empty";
  });

  protected code = computed(() => {
    const code = this.content() as string;
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

  // private readonly res = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);
}
