# @xprng/code

An image like (with `src` attribute) component to load and highlight source
code.

## Installation

```shell
npm install @xprng/code shiki
```

## Usage

### Binding source content

```html
<xpr-code code="foo()" />
<xpr-code [code]="codeContent" />
```

### Loading source from a URL

```html
<xpr-code src="https://example.com/README.content" />
<xpr-code [src]="codeUrl" />
```

### Nested state components

You can use nested components to display loading and error states.

```html
<xpr-code src="https://example.com/README.content">
  <xpr-loading-state>loading...</xpr-loading-state>
  <xpr-error-state>error loading source</xpr-error-state>
</xpr-code>
```

### Language and Theme

Set the `lang` attribute to specify the language of the code block, and `theme`
to specify the theme for syntax highlighting.

```html
<xpr-code lang="typescript" theme="github-light" code="const foo = 'bar';" />
<xpr-code lang="javascript" theme="nord" [code]="jsCodeContent" />
```

## Highlighting

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

You can load additional languages and themes by importing them in your
application module or a shared module:

```typescript
import { getHighlighter } from "@xprng/vendor/shiki";

await getHighlighter().loadLanguage("python");
await getHighlighter().loadTheme("github-dark");
```

You can find the list of available themes at
[https://shiki.style/themes](https://shiki.style/themes) and languages at
[https://shiki.style/languages](https://shiki.style/languages).
