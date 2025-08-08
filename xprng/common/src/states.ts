import { Directive } from "@angular/core";

@Directive({
  selector: "xpr-loading-state,[xpr-loading-state]",
  exportAs: "xprLoadingState",
  host: {
    class: "xpr-loading-state",
  },
})
export class LoadingState {
}

@Directive({
  selector: "xpr-error-state,[xpr-error-state]",
  exportAs: "xprErrorState",
  host: {
    class: "xpr-error-state",
  },
})
export class ErrorState {
}

@Directive({
  selector: "xpr-ok-state,[xpr-ok-state]",
  exportAs: "xprOkState",
  host: {
    class: "xpr-ok-state",
  },
})
export class OkState {
}

@Directive({
  selector: "xpr-empty-state,[xpr-empty-state]",
  exportAs: "xprEmptyState",
  host: {
    class: "xpr-empty-state",
  },
})
export class EmptyState {
}
