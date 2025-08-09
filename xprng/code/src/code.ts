import {Component, computed, inject, input, OnInit} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
// import type {HighlighterCore} from "shiki";
// import {getHighlighter} from '@xprng/vendor/shiki'

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
export class Code implements OnInit {
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
   * Options for the code content.
   * This can include a custom highlighter function and marked options.
   * @input
   */
  // readonly highlighter = input<HighlighterCore | undefined>();
  readonly highlighter = input<any | undefined>();

  //

  protected content = computed(() => {
    if (this.code()) return this.parse(this.code() ?? "");

    if (this.src()) return this.parse(this.res.hasValue() ? this.res.value() : "");

    return this.parse("");
    // throw new Error("Either 'code' or 'src' must be provided.");
  });

  private parse(text: string) {
    return this.sanitize.bypassSecurityTrustHtml(
      'aaa'
      // getHighlighter().codeToHtml(text, {lang: this.lang(), theme: this.theme()}).toString()
    );
  }

  protected readonly res = httpResource.text(() => this.src());
  private readonly sanitize = inject(DomSanitizer);


  ngOnInit() {
    if (!this.code() && !this.src()) {
      throw new Error("Either 'code' or 'src' input must be provided.");
    }
    if (this.code() && this.src()) {
      console.warn("Either 'code' or 'src' input should be provided, not both.");
    }
  }
}
