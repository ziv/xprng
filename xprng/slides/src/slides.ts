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
import {Slide} from "./slide";

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
  template: '<ng-content/>',
})
export class Slides {
  /**
   * holds the previous slide index to increase performance
   * and avoid unnecessary DOM manipulations
   * @private
   */
  private prev = -1;

  /**
   * autoplay timer
   * @private
   */
  private timer = 0;

  /**
   * Reference to the host element for fullscreen requests.
   * @private
   */
  private readonly el = inject(ElementRef);

  /**
   * Slides list
   * @private
   */
  private readonly slides = contentChildren(Slide);

  // using linkedSignals to cancel the readonly input signal limitations

  /**
   * Current slide index reference.
   * @private
   */
  private readonly current = linkedSignal<number>(() => this.idx());

  /**
   * Autoplay reference.
   * @private
   */
  private readonly shouldPlay = linkedSignal<boolean>(() => this.autoplay());

  /**
   * Interval reference.
   * @private
   */
  private readonly delay = linkedSignal<number>(() => this.interval());

  // inputs

  /**
   * The index of the slide to show.
   * @default 0
   */
  readonly idx = input<number, Attr<number>>(0, {transform: numberAttribute});

  /**
   * Whether the slideshow should loop back to the first slide after reaching the last one.
   * @default false
   */
  readonly cyclic = input<boolean, Attr<boolean>>(false, {
    transform: booleanAttribute,
  });

  /**
   * Whether the slideshow should autoplay.
   * @default false
   */
  readonly autoplay = input<boolean, Attr<boolean>>(false, {
    transform: booleanAttribute,
  });

  /**
   * The interval in milliseconds between slides when autoplay is enabled.
   * @default 5000
   */
  readonly interval = input<number, Attr<number>>(5000, {
    transform: numberAttribute,
  });

  constructor() {
    // inputs validation
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
    (document.fullscreenElement ? document.exitFullscreen : (this.el.nativeElement as HTMLElement)?.requestFullscreen)?.();
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
