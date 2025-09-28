import {Injectable} from '@angular/core';
import {createHighlighter} from 'shiki';
import {BundledHighlighterOptions} from '@shikijs/types';

@Injectable({providedIn: 'root'})
export class Highlighter {
  // Shiki highlighter instance
  shiki: Awaited<ReturnType<typeof createHighlighter>> | undefined;

  // Default theme
  theme = 'github-light';

  /**
   * Highlight code snippet with given language and optional theme
   * @param code
   * @param lang
   * @param theme
   */
  highlight(code: string, lang: string, theme?: string): string {
    if (!this.shiki) {
      throw new Error('Shiki highlighter not initialized. Make sure to call provideShiki in your app configuration.');
    }
    return this.shiki.codeToHtml(code, {
      lang,
      theme: theme ?? this.theme
    });
  }

  /**
   * Load shiki highlighter with given languages and themes
   * @param options
   */
  async load(options: BundledHighlighterOptions<any, any>) {
    if (this.shiki) {
      // already loaded, do not allow re-loading
      return;
    }
    this.shiki = await createHighlighter(options);
    this.theme = options?.themes?.[0] ?? 'github-light';
  }
}
