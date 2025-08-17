# @xprng/slides

A simple slides component for displaying presentations in Angular applications.

## Installation

```shell
npm install @xprng/slides
```

## Usage

```typescript
import { Slide, Slides } from "@xprng/slides";
```

Slides are defined using the `<xpr-slides>` component, and each slide is defined
using the `<xpr-slide>` component. You can place any HTML content and Angular
components inside the slide components.

```html
<xpr-slides>
  <xpr-slide>
    slide 1 code
  </xpr-slide>

  <xpr-slide>
    slide 2 code
  </xpr-slide>

  ...
</xpr-slides>
```

## Features

### Infinite Loop

You can enable infinite loop mode by setting the `cyclic` attribute on the
`<xpr-slides>` component. This allows you to cycle through slides continuously.

```html
<xpr-slides cyclic>
  ...slides...
</xpr-slides>
```

### Autoplay

You can enable autoplay by setting the `autoplay` attribute on the
`<xpr-slides>` component. You can also set the `interval` attribute to control
the speed of autoplay in milliseconds.

```html
<xpr-slides autoplay interval="5000">
  ...slides...
</xpr-slides>
```

You can toggle the autoplay mode and speed using keyboard shortcuts.

Autoplay is always in cyclic mode.

### Keyboard XpdNavigation

| Key(s)                   | Action                           |
| ------------------------ | -------------------------------- |
| `ArrowRight`,`ArrowDown`️ | Next slide                       |
| `ArrowLeft`, `ArrowUp`   | Previous slide                   |
| `Home`                   | First slide                      |
| `End`                    | Last slide                       |
| `Enter`                  | Toggle fullscreen mode           |
| `escape`                 | Exit fullscreen mode             |
| `a`                      | Toggle autoplay                  |
| `+`                      | increase autoplay speed by 100ms |
| `-`                      | decrease autoplay speed by 100ms |

---
