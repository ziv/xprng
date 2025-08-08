import { ContentContainerComponentHarness } from "@angular/cdk/testing";

export class MarkdownHarness extends ContentContainerComponentHarness {
  static hostSelector = "xpr-markdown";

  /**
   * The content projected in case of "md" provided mode.
   */
  getLocal = this.locatorForOptional(".xpr-local");

  /**
   * The content projected in case of "src" provided mode.
   */
  getLoaded = this.locatorForOptional(".xpr-loaded");
}
