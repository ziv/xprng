import { Marked } from "marked";
import { highlight } from "@xprng/vendor/shiki";
import { gfmHeadingId } from "marked-gfm-heading-id";

export function marked(theme: string) {
  return new Marked(highlight(theme), gfmHeadingId());
}
