import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { XpdProperties } from "../components/properties";
import { toSignal } from "@angular/core/rxjs-interop";
import { SafeResourceUrl } from "@angular/platform-browser";
import { map } from "rxjs";
import { XpdDialogs } from "../services/dialogs";
import { XpdConfiguration } from "../services/configuration";
import { XpdDocDescriptor } from "../descriptor";
import { isDebug } from "../utils";

@Component({
  selector: "xpd-docs",
  imports: [
    RouterLink,
    XpdProperties,
    RouterLinkActive,
  ],
  host: {
    class: "row wvw hvh pico",
  },
  styles: `
    aside {
      width: 20%;
      background: var(--pico-primary-background);

      img[alt="logo"] {
        margin: 1em 0 2em 0;
        cursor: pointer;
      }

      img[alt="logo"]:hover {
        filter: brightness(1.1);
      }

      div.xpd-items {
        overflow-y: auto;
        padding: 0 1.5em;
        margin: 0 .5em;
      }

      li.xpd-nav a {
        color: var(--pico-primary-inverse);
      }

      li.xpd-nav.active {
        background: var(--pico-primary-inverse);
      }

      li.xpd-nav.active a {
        color: var(--pico-primary-background);
      }
    }

    div.xpd-main {
      background: var(--pico-secondary-background);
      color: var(--pico-primary-inverse);

      h1.xpd-main {
        font-weight: 500;
        color: var(--pico-primary-inverse);
        font-size: calc(var(--pico-font-size) / 1.5);
        margin-bottom: 0;
      }

      div.xpd-preview {
        background-color: var(--pico-background-color);
      }
    }

    article.xpd-footer {
      /*background: var(--pico-secondary-background);*/
      /*color: var(--pico-primary-inverse);*/
      background-color: var(--pico-background-color);
      max-height: 40vh;
      padding-bottom: 0;
      margin-bottom: 0;

      xpd-properties {
        display: block;
        overflow-y: scroll;
        max-height: 30vh;
      }


      /*--pico-accordion-close-summary-color: var(--pico-muted-color);*/
      /*--pico-accordion-open-summary-color: var(--pico-secondary-inverse);*/

      div.xpd-properties {
        /*overflow-y: scroll;*/
      }
    }

  `,
  template: `
    <!-- side panel -->
    <aside class="col hvh centered py-10">
      <img [src]="conf.LogoUrl" routerLink="/app/home" style="width: 50%" alt="logo"/>
      <div class="xpd-items grow">
        <nav>
          <ul>
            @for (item of conf.Navigation; track item.route) {
              <li routerLinkActive="active" class="xpd-nav">
                <a [routerLink]="item.route"
                   (click)="loading.set(true)"
                   queryParamsHandling="merge">{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <button (click)="toggleColors()"><span class="sym">routine</span></button>
      <button (click)="dialogs.help()"><span class="sym">help</span></button>
      <button (click)="dialogs.settings()"><span class="sym">settings</span></button>
    </aside>

    <!-- content panel -->
    <main class="col hvh grow">

      <!-- header -->
      <div class="p-10 xpd-main">
        <h1 class="xpd-main">{{ component()?.name }}</h1>
        <small size="font-weight:300px;">{{ component()?.description }}</small>
      </div>

      <!-- preview -->
      <div class="xpd-preview col grow" style="position: relative">
        <button style="position: absolute;right:1em;bottom:.5em;">
          <span class="sym">display_settings</span>
        </button>

        <iframe #iframe
                [src]="url()" class="col grow"
                (load)="loading.set(false)"
                (error)="onIframeError($event)"></iframe>
      </div>

      <!-- footer -->
      <article class="xpd-footer">
        <details name="properties">
          <summary>Properties</summary>
          <xpd-properties [props]="component()?.props ?? []" [name]="compName()"/>
        </details>
        <details name="canvas">
          <summary>Canvas</summary>
          <fieldset>
            <label>
              <input name="grid" type="checkbox" role="switch"/> Show grid
            </label>
          </fieldset>
        </details>
      </article>
    </main>
  `,
})
export class XpdDocumentation {
  protected readonly conf = inject(XpdConfiguration);

  /// injected services

  // open dialogs
  protected readonly dialogs = inject(XpdDialogs);
  // descriptors list

  // reactivity

  // the preview iframe state
  protected readonly loading = signal(false);

  // the component name from the route
  protected readonly compName = toSignal(
    inject(ActivatedRoute).params.pipe(map((p) => p["component"] as string)),
  );

  // the preview iframe URL
  protected readonly url = computed<SafeResourceUrl | undefined>(() =>
    this.conf.iframeUrl(this.compName())
  );

  // the component descriptor itself
  protected readonly component = computed(() =>
    this.conf.descriptor(this.compName())
  );

  toggleColors() {
    const el = document.querySelector("html") as HTMLElement;
    const theme = el.getAttribute("data-theme");
    el.setAttribute(
      "data-theme",
      (!theme || theme === "light") ? "dark" : "light",
    );
  }

  onIframeError(e: any) {
    this.loading.set(false);
    if (isDebug()) {
      console.error("Error loading iframe:", e);
    }
  }
}
