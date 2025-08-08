import {Directive} from '@angular/core';

@Directive({
  selector: "xpr-loading-state,[xpr-loading-state]",
  exportAs: "xprLoadingState",
  host: {
    class: "xpr-loading-state",
  },
})
export class XprLoadingState {
}

@Directive({
  selector: "xpr-error-state,[xpr-error-state]",
  exportAs: "xprErrorState",
  host: {
    class: "xpr-error-state",
  },
})
export class XprErrorState {
}

@Directive({
  selector: "xpr-ok-state,[xpr-ok-state]",
  exportAs: "xprOkState",
  host: {
    class: "xpr-ok-state",
  },
})
export class XprOkState {
}
