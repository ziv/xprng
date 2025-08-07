# Markdown

## Installation

```shell
npm install @xprng/markdown
```

Require `HttpClient` to load markdown files. Add the `provideHttpClient()` to
your app configuration:

```typescript
import {provideHttpClient} from "@angular/common/http";
```

## Usage

```html

<xpr-markdown src="https://example.com/README.md"/>
```

### Sanitization

If you load markdown from a remote source, you need to sanitize the HTML output.
Use the `sanitize` option to enable sanitization:

```typescript
import {Markdown} from "@xprng/markdown";

@Component({
  template: `
<xpr-markdown [src]="src" [options]="opt"/>`,
  imports: [Markdown],
})
class Component {
  src = "https://example.com/README.md";

// all options are optional :)
  opt = {
    sanitize: true,
    dompurify: {/* DOM Purify options */},
    marked: { /* Marked options */},
  };
}
```

### Error Handling

If the markdown file cannot be loaded the component can display an error
message:

```html

<xpr-markdown
  src="https://example.com/README.md"
  err="Error loading markdown"
/>
```
