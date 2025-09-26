import {Component, computed, inject, input} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {Marked, MarkedOptions} from "marked";
import {gfmHeadingId} from "marked-gfm-heading-id";
import {httpResource} from "@angular/common/http";
import {Highlighter} from '@xprng/vendor';
import markedShiki from 'marked-shiki';

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
    @switch (state()) {
      @case ('local') {
        <div class="xpr-value xpr-local" [innerHTML]="markdown()"></div>
      }
      @case ('error') {
        <ng-content select="xpr-error-state"/>
      }
      @case ('loading') {
        <ng-content select="xpr-loading-state"/>
      }
      @case ('resolved') {
        <div class="xpr-value xpr-loaded" [innerHTML]="markdown()"></div>
      }
      @default {
        <ng-content select="xpr-empty-state"/>
      }
    }
  `,
})
export class Markdown {
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

  protected state = computed(() => {
    if (this.content()) return "local";
    if (this.src()) return this.res.status();
    return "empty";
  });

  protected markdown = computed(() => {
    const text = this.content() ??
      (this.res.hasValue() ? this.res.value() : "");

    const parsed = this.marked.parse(text, {
      ...this.options(),
      async: false, // make sure it's sync (return string)
    });

    return this.sanitize.bypassSecurityTrustHtml(parsed);
  });

  private readonly marked: Marked;
  private readonly sanitize = inject(DomSanitizer);
  private readonly res = httpResource.text(() => this.src());

  constructor() {
    const hls = inject(Highlighter);
    const theme = this.theme;

    // todo add more extensions
    // todo allow custom extensions via provide
    this.marked = new Marked(
      gfmHeadingId(),
      markedShiki({
        highlight(code, lang) {
          return hls.highlight(code, lang, theme());
        }
      }),
    );
  }
}
