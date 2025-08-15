import { Directive, input } from "@angular/core";
import { httpResource } from "@angular/common/http";

@Directive({})
export abstract class ContentSrc {
  /**
   * Provides code to be displayed in the component.
   * @input
   */
  readonly content = input<string | undefined>();

  /**
   * Specifies the source URL for the code.
   * If `code` is provided, `src` will be ignored.
   * @input
   */
  readonly src = input<string | undefined>();

  /**
   * Resource for fetching the code from the specified source URL.
   * @protected
   */
  protected readonly res = httpResource.text(() => this.src());
}
