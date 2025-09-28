import {Component, input} from "@angular/core";


export type Heading = { level: number; text: string; id: string; };

/**
 * Marked options for parsing markdown.
 * @see https://marked.js.org/using_advanced#options
 */
@Component({
  selector: "xpr-markdown-heading",
  host: {
    "[style.display]": '"block"',
    class: "xpr-markdown-heading",
  },
  template: `
    @for (h of heading(); track h.id) {
      @if (h.level >= range()[0] && h.level <= range()[1]) {
        <div class="xpr-markdown-header" [style.paddingLeft.px]="(h.level - range()[0]) * 16">
          <a [href]="anchor(h.id)">{{ h.text }}</a>
        </div>
      }
    }
  `,
})
export class MarkdownHeading {
  heading = input.required<Heading[]>();
  range = input<[number, number]>([1, 3]);

  anchor(id: string) {
    if (window.location) {
      return `${window.location.pathname}#${id}`;
    }
    return `#${id}`;
  }
}
