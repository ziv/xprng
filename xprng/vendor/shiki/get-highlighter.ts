import {
  createHighlighterCoreSync,
  createJavaScriptRegexEngine,
  HighlighterCore,
} from "shiki";
import js from "@shikijs/langs/javascript";
import ts from "@shikijs/langs/typescript";
import html from "@shikijs/langs/html";
import css from "@shikijs/langs/css";
import nord from "@shikijs/themes/nord";
import github from "@shikijs/themes/github-light";

const Default = Symbol("default");
const Registry = new Map<string | symbol, HighlighterCore>();

export function getHighlighter(name = Default): HighlighterCore {
  if (!Registry.has(name)) {
    Registry.set(
      name,
      createHighlighterCoreSync({
        themes: [nord, github],
        langs: [html, css, ts, js],
        engine: createJavaScriptRegexEngine(),
      }),
    );
  }
  return Registry.get(name) as HighlighterCore;
}
