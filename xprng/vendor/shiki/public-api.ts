import type {MarkedExtension} from "marked";
import {createHighlighterCore} from "shiki/core";
import {createOnigurumaEngine} from "shiki/engine/oniguruma";

export const Highlighter = await createHighlighterCore({
  themes: [
    import("@shikijs/themes/nord"),
    import("@shikijs/themes/github-light"),
  ],
  langs: [
    import("@shikijs/langs/typescript"),
    import("@shikijs/langs/javascript"),
    import("@shikijs/langs/css"),
    import("@shikijs/langs/html"),
  ],
  engine: createOnigurumaEngine(import("shiki/wasm")),
});

export function highlight(theme: string): MarkedExtension {
  return {
    async: false,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = (token.lang || "").match(/\S*/)?.[0] ?? "plaintext";
      const text = token.text || "";

      const html = Highlighter.codeToHtml(text, {lang, theme});

      // change the token type to 'html' and set the html content
      Object.assign(token, {
        type: "html",
        block: true,
        text: `${html}\n`,
      });
    },
  };
}
