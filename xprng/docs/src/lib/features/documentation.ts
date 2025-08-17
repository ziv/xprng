import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import { XpdProperties } from "../components/properties";
import { XpdNavigation } from "../services/navigation";
import { toSignal } from "@angular/core/rxjs-interop";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { delay, map, tap } from "rxjs";
import { XpdDialogs } from "../services/dialogs";
import { XpdConfiguration } from "../services/configuration";
import { XpdDescriptorsToken } from "../provide";
import { XpdDocDescriptor } from "../descriptor";
import { FormControl, FormGroup } from "@angular/forms";

/**
 * # XpdDocumentation component
 * This component serves as a host for displaying documentation of various components.
 * It provides itself to allow subcomponents to access their host and update the displayed component.
 */
@Component({
  selector: "xpd-docs",
  imports: [
    RouterLink,
    XpdProperties,
    RouterLinkActive,
  ],
  host: {
    class: "row wvw hvh pico",
    "(document:keydown.meta.s)": "dialogs.settings($event)",
    "(document:keydown.meta.h)": "dialogs.help($event)",
    "(document:keydown.Esc)": "dialogs.clear($event)",
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
      <img src="/xprng/logosh.svg" routerLink="/home" style="width: 50%" alt="logo"/>
      <div class="xpd-items grow">
        <nav>
          <ul>
            @for (item of items; track item.route) {
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
        <small>{{ component()?.description }}</small>
      </div>

      <!-- preview -->
      <div class="xpd-preview col grow">
        @if (url()) {
          <iframe #iframe [src]="url()" class="col grow" (load)="loading.set(false)"></iframe>
        }
      </div>

      <!-- footer -->
      <article class="xpd-footer">
        <details name="properties">
          <summary>Properties</summary>
          <xpd-properties [props]="component()?.props ?? []" (change)="update($event)"/>
        </details>
        <details name="source">
          <summary>Overview</summary>
          <div>
          </div>
        </details>
      </article>
    </main>
  `,
})
export class XpdDocumentation {
  /// injected services

  // open dialogs
  protected readonly dialogs = inject(XpdDialogs);
  // sanitizer for iframe URLs
  private readonly sanitize = inject(DomSanitizer);
  // descriptors list
  protected readonly descriptors = inject<XpdDocDescriptor[]>(
    XpdDescriptorsToken,
  );
  // list of routes
  protected readonly items = inject(XpdConfiguration).items;

  // reactivity

  // the preview iframe reference
  protected readonly iframe = viewChild<ElementRef>("iframe");
  // the preview iframe state
  protected readonly loading = signal(false);
  // the preview iframe URL
  protected readonly url = computed<null | SafeResourceUrl>(() =>
    this.compName()
      ? this.sanitize.bypassSecurityTrustResourceUrl(
        `#/iframe/${this.compName()}`,
      )
      : null
  );
  // the component name
  protected readonly compName = toSignal(
    inject(ActivatedRoute).params.pipe(map((p) => p["component"] as string)),
  );
  // the component descriptor itself
  protected readonly component = computed(() =>
    this.compName()
      ? this.descriptors.find((d) =>
        d.id === this.compName()
      ) as XpdDocDescriptor
      : null
  );

  // constructor() {
  //   effect(() => {
  //     const name = this.compName();
  //     if (name) {
  //       this.url.set(this.sanitize.bypassSecurityTrustResourceUrl(`#/iframe/${name}`));
  //     }
  //   });
  // }

  update(params: { [key: string]: string | number | boolean }) {
    const iframe = this.iframe()?.nativeElement as HTMLIFrameElement;
    console.log(params, iframe);
    if (!iframe || !iframe.contentWindow) {
      return;
    }
    iframe.contentWindow?.postMessage({
      type: "update",
      params: JSON.stringify(params),
    }, "*");
  }

  toggleColors() {
    const el = document.querySelector("html") as HTMLElement;
    const theme = el.getAttribute("data-theme");
    el.setAttribute(
      "data-theme",
      (!theme || theme === "light") ? "dark" : "light",
    );
  }
}
