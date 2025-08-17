import {Injectable, signal,} from "@angular/core";

export type ConfigurationOptions = {
  help: string;
  logo: string;
  navigation: { label: string; route: string }[];
};

@Injectable({providedIn: "root"})
export class XpdConfiguration {
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
}
