import { Component } from "@angular/core";
import highlighter from "../app/shiki";
import ExampleTemplate, {
  ExampleDescription,
  ExampleTitle,
} from "../components/example-template";
import { Markdown } from "@xprng/markdown";
import { EmptyState, ErrorState, LoadingState } from "@xprng/common";

@Component({
  selector: "ex-markdown-example",
  imports: [
    Markdown,
    ErrorState,
    EmptyState,
    LoadingState,
    ExampleTitle,
    ExampleTemplate,
    ExampleDescription,
  ],
  host: {
    class: "block w-full",
  },
  template: `
    <example-template [code]="code">
      <example-title>Markdown example</example-title>
      <example-desc>
        This example demonstrates how to use the <code>xpr-markdown</code> component to render Markdown content from a
        remote source.
        The content is fetched from the <a href="https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/README.md"
                                           target="_blank">repository readme</a>.
      </example-desc>
      <div>
        <h2>Empty one (no attributes)</h2>
        <xpr-markdown>
          <div xpr-error-state>unable</div>
          <div xpr-error-state>unable to load md.md</div>
          <xpr-loading-state>loading...</xpr-loading-state>
          <xpr-empty-state>nothing to show</xpr-empty-state>
        </xpr-markdown>

        <h2>Error one</h2>
        <xpr-markdown src="md.md">
          <xpr-error-state>unable to load md.md</xpr-error-state>
          <xpr-loading-state>loading...</xpr-loading-state>
          <xpr-empty-state>empty</xpr-empty-state>
        </xpr-markdown>
      </div>
    </example-template>

  `,
  styles: ``,
})
export default class MarkdownExample {
  readonly options = { highlighter, theme: "catppuccin-frappe", lang: "html" };
  readonly code = `
<xpr-markdown
    src="https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/README.md">
  <xpr-error-state>error</xpr-error-state>
  <xpr-loading-state>loading</xpr-loading-state>
</xpr-markdown>
  `;
  protected readonly open = open;

  x = `
# header

<p>aaa</p>

\`\`\`javascript
const a = new Date();
\`\`\`
  `;
}
