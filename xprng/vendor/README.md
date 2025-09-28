# @xprng/vendor

Binding 3rd-party libraries to the XPRNG library.

| Library                       | Description                     |
|-------------------------------|---------------------------------|
| [Shiki](https://shiki.style/) | Syntax highlighting for content |

## Installation

```shell
npm install @xprng/vendor shiki
```

## Usage

```ts
// app.config.ts


export const appConfig: ApplicationConfig = {
  providers: [
    /*...*/
    
    provideShiki({
      themes: ['nord', 'github-light'],
      langs: ['typescript', 'js', 'json', 'css', 'html', 'bash']
    })
  ]
}

```
