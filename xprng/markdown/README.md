# @xprng/markdown

An image like (with `src` attribute) component to load and render markdown
content.

## Installation

```shell
npm install @xprng/markdown marked
```

## Usage

### Binding markdown content

```html

<xpr-markdown md="# Markdown"/>
<xpr-markdown [md]="markdownContent"/>
```

### Loading markdown from a URL

```html

<xpr-markdown src="https://example.com/README.md"/>
<xpr-markdown [src]="markdownUrl"/>
```

### Nested state components

You can use nested components to display loading and error states.

```html

<xpr-markdown src="https://example.com/README.md">
    <xpr-loading-state>loading...</xpr-loading-state>
    <xpr-error-state>error loading markdown</xpr-error-state>
</xpr-markdown>
```
