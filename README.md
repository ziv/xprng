# (XPR)Experimental (NG)Angular Components

Micro packages of very simple, yet, smart components.

[![xprng-auto-release](https://github.com/ziv/xprng/actions/workflows/ci.yml/badge.svg)](https://github.com/ziv/xprng/actions/workflows/ci.yml)

Compatible with **Zoneless** Angular 20+.

#### Components Packages

| Package           | Component                            | Version                                                          | Content                    |
|-------------------|--------------------------------------|------------------------------------------------------------------|----------------------------|
| `@xprng/markdown` | [Markdown](xprng/markdown/README.md) | ![NPM Version](https://img.shields.io/npm/v/%40xprng%2Fmarkdown) | Markdown component         |
| `@xprng/code`     | [Code](xprng/code/README.md)         | ![NPM Version](https://img.shields.io/npm/v/%40xprng%2Fcode)     | Code highlighter component |
| `@xprng/slides`   | [Slides](xprng/slides/README.md)     | ![NPM Version](https://img.shields.io/npm/v/%40xprng%2Fslides)   | Slides viewer component    |
| `@xprng/docs`     | [Docs](xprng/docs/README.md)         | ![NPM Version](https://img.shields.io/npm/v/%40xprng%2Fdocs)     | XpdDocumentation utilities |

#### Directives Packages

| Package         | Content                          | Version                                                        | Content          |
|-----------------|----------------------------------|----------------------------------------------------------------|------------------|
| `@xprng/common` | [Common](xprng/common/README.md) | ![NPM Version](https://img.shields.io/npm/v/%40xprng%2Fcommon) | State directives |

#### Specific Packages

| Package         | Content                          | Version                                                        | Content                      |
|-----------------|----------------------------------|----------------------------------------------------------------|------------------------------|
| `@xprng/vendor` | [Vendor](xprng/vendor/README.md) | ![NPM Version](https://img.shields.io/npm/v/%40xprng%2Fvendor) | 3rd party libraries bindings |

---

## Why?

Well, this is not **another components library**, but rather a **collection** of micro packages that provide simple, yet smart components that can be used in any Angular application.

The components are designed to be **lightweight**, easy to use, and highly customizable. They are built with the latest Angular features and best practices in mind.

The components are **not opinionated**, meaning you can use them in any way you like, without being forced to follow a specific design or architecture.

The components are shipped **without styles**, but rather with a set of directives and classes that can be used to style the components in any way you like. This allows you to use the components in your own design system without having to worry about styles.

For any questions, issues, or feature requests, feel free to contact me, or open an issue in this repository.

### Shiki

[Shiki](https://shiki.style/) is a powerful syntax highlighter that supports a wide range of languages and themes. It is used in the `@xprng/code` and `@xprng/markdown` packages to provide syntax highlighting for code blocks.

It has been chosen for its lack of need to bundle CSS files and the ability to load languages and themes on demand.

### Marked

[Marked](https://marked.js.org/) is a fast and lightweight markdown parser that is used in the `@xprng/markdown` package to parse markdown content. It is highly customizable and supports a wide range of features.

It has been chosen for its speed and simplicity, making it a great choice for parsing markdown content in Angular applications and because I already contributed to the project in the past :)

---

Made with ❤️ for the Angular community.
