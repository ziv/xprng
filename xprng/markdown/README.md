# @xprng/markdown

An image like (with `src` attribute) component to load and render markdown code.

## Installation

```shell
npm install @xprng/markdown marked shiki
```

The package peer-depends on [marked](https://marked.js.org/) for parsing
markdown, [Shiki](https://shiki.style/) for syntax highlighting, and Angular.

## Usage

### Binding markdown code

```html
<xpr-markdown code="# Markdown" />
<xpr-markdown [code]="markdownContent" />
```

### Loading markdown from a URL

```html
<xpr-markdown src="https://example.com/README.code" />
<xpr-markdown [src]="markdownUrl" />
```

### Nested state components

You can use nested components to display loading and error states.

```html
<xpr-markdown src="https://example.com/README.code">
  <xpr-loading-state>loading...</xpr-loading-state>
  <xpr-error-state>error loading markdown</xpr-error-state>
</xpr-markdown>
```

The state components are imported from the [@xprng/common](../common/README.md)
package.

### Highlighted content blocks

See [@xprng/content](../code/README.md) for more details about languages and
themes supported.

Set a theme on a component:

```html
<xpr-markdown src="https://example.com/README.code" theme="github-dark" />
```
