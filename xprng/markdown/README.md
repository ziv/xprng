# @xprng/markdown

An image like (with `src` attribute) component to load and render markdown
content.

## Installation

```shell
npm install @xprng/markdown marked shiki
```

The package peer-depends on [marked](https://marked.js.org/) for parsing
markdown, [Shiki](https://shiki.style/) for syntax highlighting, and Angular.

## Usage

### Binding markdown content

```html
<xpr-markdown md="# Markdown" />
<xpr-markdown [md]="markdownContent" />
```

### Loading markdown from a URL

```html
<xpr-markdown src="https://example.com/README.md" />
<xpr-markdown [src]="markdownUrl" />
```

### Nested state components

You can use nested components to display loading and error states.

```html
<xpr-markdown src="https://example.com/README.md">
  <xpr-loading-state>loading...</xpr-loading-state>
  <xpr-error-state>error loading markdown</xpr-error-state>
</xpr-markdown>
```

The state components are imported from the [@xprng/common](../common/README.md)
package.

### Highlighted code blocks

By default, code blocks are highlighted using [Shiki](https://shiki.style/). In
order to keep the bundle size small, you need to import the languages you want
to use. The bundle contains the following languages and themes by default:

- Languages
  - `typescript`
  - `javascript`
  - `html`
  - `css`
- Themes
  - `github-light` (default)
  - `nord`

### Loading languages and themes

The package exports the `shiki` instance, so you can load languages and themes
as needed.

```typescript
import { Highlighter } from "@xprng/markdown";

await Highlighter.loadLanguage("python");
await Highlighter.loadTheme("github-dark");
```

Set the theme on a component:

```html
<xpr-markdown src="https://example.com/README.md" theme="github-dark" />
```

You can find the list of available themes at
[https://shiki.style/themes](https://shiki.style/themes) and languages at
[https://shiki.style/languages](https://shiki.style/languages).
