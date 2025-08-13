import {Marked} from "marked";
import {highlight} from "@xprng/vendor/shiki";

export function marked(theme: string) {
  return new Marked(highlight(theme));
}
