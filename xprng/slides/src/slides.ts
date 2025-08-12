import {
  booleanAttribute,
  Component,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { Slide } from "./slide";

type Attr<T> = T | string | null | undefined;

@Component({
  selector: "xpr-slides",
  encapsulation: ViewEncapsulation.None,
  host: {
    "(document:keydown.ArrowLeft)": "previous()",
    "(document:keydown.ArrowUp)": "previous()",
    "(document:keydown.Backspace)": "previous()",
    "(document:keydown.ArrowRight)": "next()",
    "(document:keydown.ArrowDown)": "next()",
    "(document:keydown.Space)": "next()",
    "(document:keydown.Enter)": "toggleFullScreen()",
    "(document:keydown.Home)": "first()",
    "(document:keydown.End)": "last()",
    "(document:keydown.a)": "toggleAutoPlay()",
    "(document:keydown.+)": "inc()",
    "(document:keydown.-)": "dec()",
    "(click)": "next()",
  },
  styles: `
    xpr-slides {
      position: relative;
      display: block;
      min-width: 3em;
      min-height: 2em;

      xpr-slide {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
  `,
  template: "<ng-content/>",
})
export class Slides {
  private prev = -1;
  private timer = 0;
  private readonly el = inject(ElementRef);
  private readonly slides = contentChildren(Slide);

  // using linkedSignals to cancel the readonly input signal limitations
  private readonly current = linkedSignal<number>(() => this.idx());
  private readonly shouldPlay = linkedSignal<boolean>(() => this.autoplay());
  private readonly delay = linkedSignal<number>(() => this.interval());

  protected readonly notification = signal<string>("");
  protected readonly notificationClass = signal<string>(
    "xpr-slides-notification",
  );

  readonly idx = input<number, Attr<number>>(0, { transform: numberAttribute });

  readonly cyclic = input<boolean, Attr<boolean>>(false, {
    transform: booleanAttribute,
  });

  readonly autoplay = input<boolean, Attr<boolean>>(false, {
    transform: booleanAttribute,
  });

  readonly interval = input<number, Attr<number>>(5000, {
    transform: numberAttribute,
  });

  constructor() {
    // input range validation
    effect(() => {
      const idx = this.idx();

      if (idx > this.slides().length) {
        throw new RangeError(
          `Invalid show index: ${idx}. It must be between 0 and ${
            this.slides().length - 1
          }.`,
        );
      }

      if (idx < 0) {
        throw new RangeError(
          `Invalid show index: ${idx}. It must be between 0 and ${
            this.slides().length - 1
          }.`,
        );
      }
    });

    // change the slides visibility when the current slide changes
    effect(() => {
      if (this.slides().length === 0) {
        return;
      }

      if (this.prev !== -1) {
        this.slides()[this.prev].hide();
      }

      this.slides()[this.current()].show();
    });

    // autoplay handler
    effect(() => {
      if (!this.shouldPlay()) {
        if (this.timer !== 0) {
          clearInterval(this.timer);
          this.timer = 0;
        }
        return;
      }
      if (this.timer) {
        return;
      }
      if (this.delay() <= 0) {
        throw new RangeError(
          `Invalid interval: ${this.delay()}. It must be greater than 0.`,
        );
      }
      this.timer = setInterval(() => {
        this.next();
      }, this.delay());
    });
  }

  protected toggleAutoPlay() {
    this.shouldPlay.set(!this.shouldPlay());
  }

  protected toggleFullScreen() {
    if (!document.fullscreenElement) {
      (this.el.nativeElement as HTMLElement)?.requestFullscreen().catch(
        console.error,
      );
    } else {
      document.exitFullscreen?.().catch(console.error);
    }
  }

  protected next() {
    this.prev = this.current();
    const next = this.current() + 1;
    const length = this.slides().length;
    if (next >= length) {
      if (this.cyclic() || this.shouldPlay()) {
        this.current.set(0);
        return;
      }
      // nothing to do, we are already at the last slide
      return;
    }
    this.current.set(next);
  }

  protected previous() {
    this.prev = this.current();
    const previous = this.current() - 1;
    if (previous < 0) {
      if (this.cyclic()) {
        this.current.set(this.slides().length - 1);
        return;
      }
      // nothing to do, we are already at the first slide
      return;
    }
    this.current.set(previous);
  }

  protected first() {
    this.prev = this.current();
    this.current.set(0);
  }

  protected last() {
    this.prev = this.current();
    this.current.set(this.slides().length - 1);
  }

  protected inc() {
    this.delay.set(Math.max(100, this.delay() - 100));
  }

  protected dec() {
    this.delay.set(this.delay() + 100);
  }
}
