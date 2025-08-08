import {Directive} from '@angular/core';

@Directive({
  selector: "xpr-loading-state,[xpr-loading-state]",
  exportAs: "xprMarkdownLoading",
  host: {
    class: "xpr-loading-state",
  },
})
export class XprLoadingState {
}

@Directive({
  selector: "xpr-error-state,[xpr-error-state]",
  exportAs: "xprMarkdownError",
  host: {
    class: "xpr-error-state",
  },
})
export class XprErrorState {
}
