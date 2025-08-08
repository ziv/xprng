# (XP)Experimental (NG)Angular Components

Micro packages of simple and smart components.

[![xprng-auto-release](https://github.com/ziv/xprng/actions/workflows/ci.yml/badge.svg)](https://github.com/ziv/xprng/actions/workflows/ci.yml)

Compatible with **Zoneless** Angular 20+.

| Component | Package           | Reference                           |
| --------- | ----------------- | ----------------------------------- |
| Markdown  | `@xprng/markdown` | [0.2.0](packages/xprng/components/md/README.md) |

## Packages

---

### Markdown

An image like (with `src` attribute) component to load and render markdown
content.

```html
<xpr-markdown src="https://example.com/README.md">
```

#### Nested state components

You can use nested components to handle loading and error states.

```html
<xpr-markdown src="https://example.com/README.md">
  <xpr-markdown-loading>loading...</xpr-markdown-loading>
  <xpr-markdown-error>error loading markdown</xpr-markdown-error>
</xpr-markdown>
```
