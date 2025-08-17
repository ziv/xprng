import {Component, computed, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {ActivatedRoute, Params, RouterLink, RouterLinkActive} from '@angular/router';
import {XpdProperties} from '../components/properties';
import {XpdNavigation} from '../services/navigation';
import {toSignal} from '@angular/core/rxjs-interop';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {delay, map, tap} from 'rxjs';
import {XpdDialogs} from '../services/dialogs';
import {XpdConfiguration} from '../services/configuration';
import {XpdDescriptorsToken} from '../provide';
import {XpdDocDescriptor} from '../descriptor';
import {FormControl, FormGroup} from '@angular/forms';

/**
 * # XpdDocumentation component
 * This component serves as a host for displaying documentation of various components.
 * It provides itself to allow subcomponents to access their host and update the displayed component.
 */
@Component({
  selector: 'xpd-docs',
  imports: [
    RouterLink,
    XpdProperties,
    RouterLinkActive,

  ],
  host: {
    class: 'row wvw hvh pico',
    '(document:keydown.meta.s)': 'dialogs.settings($event)',
    '(document:keydown.meta.h)': 'dialogs.help($event)',
    '(document:keydown.Esc)': 'dialogs.clear($event)',
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

    main.xpd-main {
      background: var(--pico-secondary-background);
      color: var(--pico-primary-inverse);

      h1.xpd-main {
        color: var(--pico-primary-inverse);
        font-size: calc(var(--pico-font-size) / 1.5);
        margin-bottom: 0;
      }
    }

    article.xpd-footer {
      background: var(--pico-secondary-background);
      color: var(--pico-primary-inverse);
      max-height: 40vh;
      padding-bottom: 0;
      margin-bottom: 0;

      xpd-properties {
        display: block;
        overflow-y: scroll;
        max-height: 30vh;
      }


      --pico-accordion-close-summary-color: var(--pico-muted-color);
      --pico-accordion-open-summary-color: var(--pico-secondary-inverse);

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
                <a [routerLink]="item.route" queryParamsHandling="merge">{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <button><span class="sym">routine</span></button>
      <button (click)="dialogs.help()"><span class="sym">help</span></button>
      <button (click)="dialogs.settings()"><span class="sym">settings</span></button>
    </aside>

    <!-- content panel -->
    <main class="xpd-main col hvh grow">

      <!-- header -->
      <div class="m-10">
        <h1 class="xpd-main">{{ component()?.name }}</h1>
        <small>{{ component()?.description }}</small>
      </div>

      <!-- preview -->
      <div class="col grow" style="">
        @if (url()) {
          <iframe [src]="url()" class="grow" (load)="loading.set(false)"></iframe>
        }
      </div>

      <!-- footer -->
      <article class="xpd-footer">
        <details name="properties" open>
          <summary>Properties</summary>
          <xpd-properties [props]="component()?.props ?? []" (change)="update($event)"/>
        </details>
      </article>
    </main>
  `,
})
export class XpdDocumentation {
  // properties form (see constructor)
  protected form = new FormGroup({});
  // component descriptor (see constructor)
  // descriptors list
  protected readonly descriptors = inject<XpdDocDescriptor[]>(XpdDescriptorsToken);
  // the preview iframe state
  protected readonly loading = signal(false);
  // the component name
  protected readonly compName = toSignal(inject(ActivatedRoute).params.pipe(
    map(p => p['component'] as string),
  ));
  // the component descriptor itself
  protected readonly component = computed(() => {
    const name = this.compName();
    if (!name) {
      return null;
    }
    return this.descriptors.find(d => d.id === name) as XpdDocDescriptor;
  });
  // list of routes
  protected readonly items = inject(XpdConfiguration).items;

  protected readonly dialogs = inject(XpdDialogs);
  private readonly sanitize = inject(DomSanitizer);

  // iframe URL
  protected readonly url = signal<null | SafeResourceUrl>(null);


  constructor() {
    effect(() => {
      const name = this.compName();
      setTimeout(() => {
        this.url.set(this.sanitize.bypassSecurityTrustResourceUrl(`#/iframe/${name}`))
      }, 500)
    });
  }

  update(params: { [key: string]: string | number | boolean }) {
    const qs = new URLSearchParams(params as Record<string, string>);
    const name = this.compName();
    this.url.set(this.sanitize.bypassSecurityTrustResourceUrl(`#/iframe/${name}?${qs.toString()}`));
  }

  // todo complete this part

  // change the height of the properties panel (dragging the bottom edge)
  start() {
    // if (this.minimized()) {
    //   return;
    // }
    // const el = (this.properties()?.nativeElement as HTMLElement).offsetHeight;
    // const h = window.innerHeight;
    // // this.top = el.getBoundingClientRect().top; //  - window.scrollY;
    //
    // let last = 0;
    // const onMouseMove = (e: MouseEvent) => {
    //   console.log('mousemove', e.clientY, h);
    //   if (last !== 0) {
    //     let newHeight = h - e.clientY + 1; //  el.offsetHeight - e.clientY; // (e.clientY - last - 1);
    //     // let neeHeight = this.height() + (e.clientY - last);
    //     if (newHeight < 100) {
    //       newHeight = 100;
    //     }
    //     this.height.set(`${newHeight}px`);
    //   }
    //   last = e.clientY;
    // };
    // // document.addEventListener('mousemove', onMouseMove);
    // document.addEventListener('mousemove', onMouseMove);
    //
    //
    // document.addEventListener('mouseleave', () => {
    //   document.removeEventListener('mousemove', onMouseMove);
    // }, {once: true});
    // document.addEventListener('mouseup', () => {
    //   document.removeEventListener('mousemove', onMouseMove);
    // }, {once: true});
  }
}
