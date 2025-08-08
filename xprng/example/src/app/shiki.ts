// `shiki/core` entry does not include any themes or languages or the wasm binary.
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

// using dynamic imports for chunk splitting
const highlighter = await createHighlighterCore({
  themes: [
    import("@shikijs/themes/nord"),
    import("@shikijs/themes/material-theme-ocean"),
    import("@shikijs/themes/catppuccin-macchiato"),
    import("@shikijs/themes/catppuccin-frappe"),
    import("@shikijs/themes/github-light"),
  ],
  langs: [
    import("@shikijs/langs/javascript"),
    import("@shikijs/langs/css"),
    import("@shikijs/langs/html"),
  ],
  // `shiki/wasm` contains the wasm binary inlined as base64 string.
  engine: createOnigurumaEngine(import("shiki/wasm")),
});

export default highlighter;
// optionally, load themes and languages after creation
// await highlighter.loadTheme(import('@shikijs/themes/vitesse-light'))

// const code = highlighter.codeToHtml('const a = 1', {
//   lang: 'javascript',
//   theme: 'material-theme-ocean'
// })
