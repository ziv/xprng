import {inject, Injectable, provideAppInitializer} from '@angular/core';
import {createHighlighter} from 'shiki';

@Injectable({providedIn: 'root'})
export class Highlighter {
  shiki: Awaited<ReturnType<typeof createHighlighter>> | undefined;
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
   * @param langs
   * @param themes
   */
  async load(langs: string[], themes: string[]) {
    this.shiki = await createHighlighter({langs, themes});
    this.theme = themes[0] ?? 'github-light';
  }
}

export function provideShiki(langs: string[], themes: string[] = ['nord', 'github-light']) {
  return provideAppInitializer(async () => {
    await inject(Highlighter).load(langs, themes);
  });
}
