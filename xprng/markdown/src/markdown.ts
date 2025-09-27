import {Component, computed, effect, inject, input, signal} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Marked, MarkedOptions} from "marked";
import {gfmHeadingId} from "marked-gfm-heading-id";
import {httpResource} from "@angular/common/http";
import {Highlighter} from '@xprng/vendor';
import markedShiki from 'marked-shiki';
import fm from 'front-matter';

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
  private readonly marked: Marked;
  private readonly sanitize = inject(DomSanitizer);
  private readonly res = httpResource.text(() => this.src());

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

  /**
   * Parsed front-matter attributes
   */
  readonly frontmatter = signal<Record<string, string>>({});

  //

  /**
   * Current state of the component (for template switching)
   */
  protected state = computed(() => {
    if (this.content()) return "local";
    if (this.src()) return this.res.status();
    return "empty";
  });

  /**
   * Parsed front-matter result
   */
  protected parsed = computed(() => {
    const content = this.content();
    if (content) {
      return fm(content);
    }
    if (this.res.hasValue()) {
      return fm(this.res.value());
    }
    return fm('');
  });

  /**
   * The rendered and sanitized HTML from the markdown content.
   */
  protected markdown = signal<SafeHtml>(this.sanitize.bypassSecurityTrustHtml(''));
  // protected markdown = computed(() => {
  //   const parsed = this.marked.parse(this.parsed().body, {
  //     ...this.options(),
  //     async: false, // make sure it's sync (return string)
  //   });
  //   return this.sanitize.bypassSecurityTrustHtml(parsed);
  // });


  constructor() {
    const hls = inject(Highlighter);
    const theme = this.theme;

    this.marked = new Marked(
      gfmHeadingId(),
      markedShiki({
        highlight(code, lang) {
          return hls.highlight(code, lang, theme());
        }
      }),
    );

    effect(async () => {
      // on parsed changed, set 2 signals
      const parsed = await this.marked.parse(this.parsed().body, this.options());

      this.frontmatter.set(this.parsed().attributes as Record<string, string>);
      this.markdown.set(this.sanitize.bypassSecurityTrustHtml(parsed));
    });
  }
}
