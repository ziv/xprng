# @xprng/code

An image like (with `src` attribute) component to load and highlight source code.

## Usage

### Binding source content

```html

<xpr-code code="foo()"/>
<xpr-code [code]="codeContent"/>
```

### Loading source from a URL

```html

<xpr-code src="https://example.com/README.md"/>
<xpr-code [src]="codeUrl"/>
```

### Nested state components

You can use nested components to display loading and error states.

```html

<xpr-code src="https://example.com/README.md">
  <xpr-loading-state>loading...</xpr-loading-state>
  <xpr-error-state>error loading source</xpr-error-state>
</xpr-code>
```
