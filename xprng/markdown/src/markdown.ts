import {Component, computed, effect, inject, input, signal} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Marked, MarkedOptions} from "marked";
import {gfmHeadingId, getHeadingList} from "marked-gfm-heading-id";
import {httpResource} from "@angular/common/http";
import {Highlighter} from '@xprng/vendor';
import markedShiki from 'marked-shiki';
import fm from 'front-matter';
import type {Heading} from './markdown-heading';

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
        <div class="xpr-value xpr-local" [innerHTML]="safe()"></div>
      }
      @case ('error') {
        <ng-content select="xpr-error-state"/>
      }
      @case ('loading') {
        <ng-content select="xpr-loading-state"/>
      }
      @case ('resolved') {
        <div class="xpr-value xpr-loaded" [innerHTML]="safe()"></div>
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
  private readonly res = httpResource.text(() => {
    if (this.content()) {
      // if content is provided, do not fetch (super lazy)
      return undefined;
    }
    return this.src()
  });

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

  /**
   * Parsed front-matter attributes
   */
  readonly frontmatter = computed(() => this.parsed().frontmatter);

  /**
   * The markdown content string
   */
  readonly markdown = computed(() => this.parsed().body);

  readonly headings = signal<Heading[]>([]);

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
   * The parsed front-matter and body from the raw markdown content.
   * @protected
   */
  protected parsed = computed(() => {
    if (this.content()) {
      return fm(this.content() as string);
    }
    if (this.res.hasValue()) {
      return fm(this.res.value() as string);
    }
    return fm('');
  });

  /**
   * The rendered HTML from the markdown content, sanitized for safe insertion into the DOM.
   * @protected
   */
  protected safe = signal<SafeHtml>(this.sanitize.bypassSecurityTrustHtml(''));


  constructor() {
    // set an effect for the async parsing
    effect(async () => {
      const html = await this.marked.parse(this.markdown(), this.options());
      this.safe.set(this.sanitize.bypassSecurityTrustHtml(html));
    });

    // init marked with shiki highlighter
    const hls = inject(Highlighter);
    const theme = this.theme;
    const heading = this.headings;

    this.marked = new Marked(
      gfmHeadingId(),
      {
        hooks: {
          postprocess(html) {
            heading.set(getHeadingList() as Heading[]);
            return html;
          }
        }
      },
      markedShiki({
        highlight(code, lang) {
          return hls.highlight(code, lang, theme());
        }
      }),
    );
  }
}
