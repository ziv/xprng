import { ComponentHarness } from "@angular/cdk/testing";

export class ErrorStateHarness extends ComponentHarness {
  static hostSelector = "xpr-error-state";
}

export class LoadingStateHarness extends ComponentHarness {
  static hostSelector = "xpr-loading-state";
}

export class EmptyStateHarness extends ComponentHarness {
  static hostSelector = "xpr-empty-state";
}
