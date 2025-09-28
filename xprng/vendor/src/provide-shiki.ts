import {BundledHighlighterOptions} from '@shikijs/types';
import {inject, provideAppInitializer} from '@angular/core';
import {Highlighter} from './highlighter';

/**
 * Load and provide Shiki highlighter with given languages and themes
 * @param options
 */
export function provideShiki(options: BundledHighlighterOptions<any, any>) {
  return provideAppInitializer(async () => {
    await inject(Highlighter).load(options);
  });
}
