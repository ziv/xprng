import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { SampleForm } from './components/sample-form';
import Styler from './services/styler';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Variables } from './components/variables';
import { Perspective } from '../../../xpr/components/perspective/perspective';
import { Expansion } from '../../../xpr/components/expansion/expansion';
import { Subject } from 'rxjs';
import type { OrEmpty } from './types';

@Component({
  selector: 'creator-root',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    SampleForm,
    JsonPipe,
    Variables,
    Perspective,
    Expansion,
    AsyncPipe
  ],
  template: `
    <!--    <xpr-perspective>-->
    <header>
      <span>TINY THEME CREATOR</span>
    </header>
    <main>
      <div class="start">
        Left
        <details>
          <summary>element x</summary>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
        </details>
      </div>
      <div class="col demo" #demo style="flex: 1">
        <creator-sample-form></creator-sample-form>
      </div>
      <div class="col">
        <creator-variables [styler]="styler"></creator-variables>
      </div>
    </main>
    <footer>
      footer
    </footer>
    <!--    </xpr-perspective>-->
  `,
  styles: [
    `
      header, footer {
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        color: var(--color-primary);
        background-color: var(--color-quinary);
      }

      main {
        height: calc(100% - 6em);
        display: flex;
        justify-content: space-between;

        .start {
          background-color: var(--color-quinary);
        }

        .col,
        .start {
          border: 1px solid red;
        }


        .demo {
          padding: 1em;
        }
      }
    `
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('demo') demo?: ElementRef;
  styler = new Styler();

  constructor() {
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.styler.el = this.demo?.nativeElement;
    this.styler.update();
  }

}
