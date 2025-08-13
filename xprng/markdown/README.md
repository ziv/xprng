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
<xpr-markdown content="# Markdown" />
<xpr-markdown [content]="markdownContent" />
```

### Loading markdown from a URL

```html
<xpr-markdown src="https://example.com/README.content" />
<xpr-markdown [src]="markdownUrl" />
```

### Nested state components

You can use nested components to display loading and error states.

```html
<xpr-markdown src="https://example.com/README.content">
  <xpr-loading-state>loading...</xpr-loading-state>
  <xpr-error-state>error loading markdown</xpr-error-state>
</xpr-markdown>
```

The state components are imported from the [@xprng/common](../common/README.md)
package.

### Highlighted code blocks

See [@xprng/code](../code/README.md) for more details about languages and themes
supported.

Set a theme on a component:

```html
<xpr-markdown src="https://example.com/README.content" theme="github-dark" />
```
