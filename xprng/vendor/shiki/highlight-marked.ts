import type { MarkedExtension } from "marked";
import { getHighlighter } from "./get-highlighter";

/**
 * Highlight content blocks in marked using Shiki.
 * @param theme
 */
export function highlight(theme: string): MarkedExtension {
  return {
    async: false,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = (token.lang ?? "plaintext").toLowerCase().trim();
      const text = token.text ?? "";

      const html = getHighlighter().codeToHtml(text, { lang, theme });

      // change the token type to 'html' and set the html code
      Object.assign(token, {
        type: "html",
        block: true,
        text: `${html}\n`,
      });
    },
  };
}
