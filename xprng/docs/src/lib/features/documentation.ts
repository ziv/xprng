import {Component, computed, ElementRef, inject, signal, viewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {XpdProperties} from '../components/properties';
import {XpdPreview} from '../components/preview';
import {XpdConfiguration} from '../services/configuration';
import {XpdShared} from '../services/shared';
import {XpdNavigation} from '../services/navigation';

/**
 * # XpdDocumentation component
 * This component serves as a host for displaying documentation of various components.
 * It provides itself to allow subcomponents to access their host and update the displayed component.
 */
@Component({
  selector: 'xpd-docs',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    XpdProperties,
    XpdPreview,

  ],
  host: {
    class: 'row wvw hvh',
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

    li.tab {
      padding-bottom: 0;
      padding-top: 0;
    }

    .xpd-expander {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      cursor: ns-resize;
      background: var(--pico-secondary-background);
    }

    .xpd-expander:hover {
      background: var(--pico-primary);
    }
  `,
  template: `
    <!-- side panel -->
    <aside class="col hvh centered py-10">
      <img [src]="logo" routerLink="/home" style="width: 50%" alt="logo"/>
      <div class="grow" style="overflow-y: auto; padding:0 1.5em;margin: 0 .5em;">
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
      <button (click)="help()"><span class="sym">help</span></button>
      <button (click)="settings()"><span class="sym">settings</span></button>
    </aside>

    <!-- content panel -->
    <main class="xpd-main col hvh grow">
      @let c = shared.component();
      <div class="m-10">
        @if (c) {
          <h1 class="xpd-main">{{ c.name }}</h1>
          @if (c.description) {
            <small>{{ c.description }}</small>
          }
        }
      </div>

      <xpd-preview>
        <router-outlet/>
      </xpd-preview>

      <!-- properties -->
      <div class="px-10" style="zoom:.7;position: relative;">
        <div class="xpd-expander" (mousedown)="start()"></div>
        <!-- properties toolbar -->
        <nav>
          <button class="secondary">Properties
          </button>
          @if (minimized()) {
            <button (click)="minimize(false)"
                    class="secondary toolbar"
                    data-tooltip="Maximize"
                    data-placement="left">
              <span class="sym">maximize</span>
            </button>
          } @else {
            <button (click)="minimize(true)"
                    class="secondary toolbar"
                    data-tooltip="Minimize"
                    data-placement="left">
              <span class="sym">minimize</span>
            </button>
          }
        </nav>

        @if (!minimized()) {
          <div [style.height]="height()" style="min-height: 5em;overflow-y: auto;" #properties>
            @if (c && c.props) {
              <xpd-properties [props]="c.props"/>
            }

          </div>
        }
      </div>
    </main>
  `,
})
export class XpdDocumentation {
  protected readonly logo = inject(XpdConfiguration).logo;
  protected readonly items = inject(XpdConfiguration).items;
  protected readonly shared = inject(XpdShared);
  private readonly nav = inject(XpdNavigation);
  private readonly properties = viewChild<ElementRef>('properties');

  minimize(minimize: boolean) {
    this.nav.merge({minimize})
  }

  settings() {
    return this.nav.merge({settings: true});
  }

  help() {
    return this.nav.merge({help: true});
  }

  protected readonly minimized = computed(() => this.nav.booleanParam('minimize') ?? false);


  // todo complete this part

  height = signal<string>('auto');

  // change the height of the properties panel (dragging the bottom edge)
  start() {
    if (this.minimized()) {
      return;
    }
    const el = this.properties()?.nativeElement as HTMLElement;
    // this.top = el.getBoundingClientRect().top; //  - window.scrollY;

    let last = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (last !== 0) {
        const newHeight = el.offsetHeight - (e.clientY - last);
        if (newHeight > 100) {
          // el.style.height = `${newHeight}px`;
          this.height.set(`${newHeight}px`);
        }
      }
      last = e.clientY;
    };
    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, {once: true});
  }
}
