import { ContentContainerComponentHarness } from "@angular/cdk/testing";

export class CodeHarness extends ContentContainerComponentHarness {
  static hostSelector = "xpr-code";

  getSrcEl = this.locatorForOptional(".xpr-loaded");
  getMdVEl = this.locatorForOptional(".xpr-md");
}
