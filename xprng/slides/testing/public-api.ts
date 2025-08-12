import { ContentContainerComponentHarness } from "@angular/cdk/testing";

export class SlideHarness extends ContentContainerComponentHarness {
  static readonly hostSelector = "xpr-slide";

  content = this.locatorForOptional("*");
}

export class SlidesHarness extends ContentContainerComponentHarness {
  static readonly hostSelector = "xpr-slides";

  content = this.locatorForOptional("*");

  readonly slides = this.locatorForAll(SlideHarness);

  async getSlideCount(): Promise<number> {
    return (await this.slides()).length;
  }

  async getSlideAtIndex(index: number): Promise<SlideHarness> {
    const allSlides = await this.slides();
    return allSlides[index];
  }
}
