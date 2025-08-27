import {Component, computed, inject, input} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import type {HighlighterCore} from "shiki";
import {getHighlighter} from "@xprng/vendor/shiki";
import {httpResource} from "@angular/common/http";
import {thsTransformer, twoandhalfslash} from 'twoandhalfslash';


/**
 * # Code
 *
 * This component is used to display source content with syntax highlighting.
 * It can either take a string of content directly or fetch it from a remote source.
 *
 * ## Inputs
 *
 * - `content`: A string containing the source content to be displayed. When provided, it overrides the `src` input.
 * - `src`: A URL from which to fetch the source content. Ignored if `content` is provided.
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
 * <xpr-code [content]="myCode" lang="javascript" theme="nord"></xpr-code>
 * ```
 *
 * ### Fetching content from a remote source
 *
 * ```html
 * <xpr-code src="https://example.com/my-code.js" lang="javascript" theme="nord"></xpr-code>
 * ```
 *
 * ### Using nested code for different states
 * ```html
 * <xpr-code src="https://example.com/my-code.js" lang="javascript" theme="nord">
 *   <xpr-loading-state>Loading...</xpr-loading-state>
 *   <xpr-error-state>Error loading content.</xpr-error-state>
 *   <xpr-empty-state>No content available.</xpr-empty-state>
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
export class Code {
  /**
   * Provides code to be displayed in the component.
   * @input
   */
  readonly content = input<string | undefined>();

  /**
   * Specifies the source URL for the code.
   * If `code` is provided, `src` will be ignored.
   * @input
   */
  readonly src = input<string | undefined>();

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
    const parse = (text: string) =>
      this.sanitize.bypassSecurityTrustHtml(
        twoandhalfslash(getHighlighter().codeToHtml(text, {
          lang: this.lang(),
          theme: this.theme(),
          transformers: [thsTransformer]
        }).toString())
      );

    if (this.content()) return parse(this.content() as string);

    if (this.res.hasValue()) return parse(this.res.value());

    return parse("");
  });

  private readonly sanitize = inject(DomSanitizer);
  private readonly res = httpResource.text(() => this.src());
}
