# (XP)Experimental (NG)Angular Components

Micro packages of simple and smart components.

[![xprng-auto-release](https://github.com/ziv/xprng/actions/workflows/ci.yml/badge.svg)](https://github.com/ziv/xprng/actions/workflows/ci.yml)

Compatible with **Zoneless** Angular 20+.

| Component | Package           | Reference                           |
| --------- | ----------------- | ----------------------------------- |
| Markdown  | `@xprng/markdown` | [0.0.5](./xprng/markdown/README.md) |

## Packages

---

### Markdown

An image like (with `src` attribute) component to load and render markdown
content.

```html
<xpr-markdown
  src="https://example.com/README.md"
  err="Error loading markdown"
  loading="Loading readme..."
/>
```
