import {ContentContainerComponentHarness} from "@angular/cdk/testing";
import {ErrorStateHarness} from '@xprng/common/testing';

/**
 * Harness for interacting with `Code` components in tests.
 */
export class CodeHarness extends ContentContainerComponentHarness {
  static hostSelector = "xpr-code";
}
