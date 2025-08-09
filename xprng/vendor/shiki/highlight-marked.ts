import type { MarkedExtension } from "marked";
import { getHighlighter } from "./get-highlighter";

export function highlight(theme: string): MarkedExtension {
  return {
    async: false,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = (token.lang || "").match(/\S*/)?.[0] ?? "plaintext";
      const text = token.text || "";

      const html = getHighlighter().codeToHtml(text, { lang, theme });

      // change the token type to 'html' and set the html content
      Object.assign(token, {
        type: "html",
        block: true,
        text: `${html}\n`,
      });
    },
  };
}
