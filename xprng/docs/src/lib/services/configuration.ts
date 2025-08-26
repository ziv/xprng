import { inject, Injectable, signal } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { XpdDocDescriptor } from "../descriptor";

export type ConfigurationOptions = {
  descriptors: XpdDocDescriptor[];
  iframe: string;
  help: string;
  logo: string;
  navigation: { label: string; route: string }[];
};

@Injectable({ providedIn: "root" })
export class XpdConfiguration {
  // sanitizer for the iframe URL
  private readonly sanitize = inject(DomSanitizer);

  // configuration options
  readonly conf = signal<Partial<ConfigurationOptions>>({});

  get HelpUrl() {
    return this.conf().help;
  }

  get LogoUrl() {
    return this.conf().logo;
  }

  get Navigation() {
    return this.conf().navigation ?? [];
  }

  iframeUrl(name: string | undefined) {
    if (!name) {
      return undefined;
    }
    const url = this.conf().iframe;
    if (!url) {
      return undefined;
    }
    return this.sanitize.bypassSecurityTrustResourceUrl(
      `${url}#/iframe/${name}`,
    );
  }

  descriptor(name: string | undefined) {
    if (!name) {
      return undefined;
    }
    return (this.conf().descriptors ?? []).find((d) => d.id === name) as
      | XpdDocDescriptor
      | undefined;
  }
}
