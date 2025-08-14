import { ContentContainerComponentHarness } from "@angular/cdk/testing";

export class MarkdownHarness extends ContentContainerComponentHarness {
  static hostSelector = "xpr-markdown";

  /**
   * The code projected in case of "code" provided mode.
   */
  getLocal = this.locatorForOptional(".xpr-local");

  /**
   * The code projected in case of "src" provided mode.
   */
  getLoaded = this.locatorForOptional(".xpr-loaded");
}
