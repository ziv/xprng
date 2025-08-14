import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'xpd-player',
  imports: [FormsModule],
  host: {
    '[style]': 'contentStyles()'
  },
  styles: `
    :host {
      flex: 1;
      display: block;
      position: relative;
      overflow-y: scroll;
      background-color: white;
    }

    div.toolbar {
      position: sticky;
      top: 0;
      background-color: red;

      button {
        position: absolute;
        right: 0;
      }
    }

    div.content {
      display: flex;
      padding: 1em;
      min-height: 90%;
      justify-content: center;
      align-items: center;
    }
  `,
  template: `
<!--    <div class="toolbar">-->
<!--      <button class="secondary" data-tooltip="open controls" data-placement="left">▦</button>-->
<!--    </div>-->
    <div class="content">
      <ng-content/>
    </div>
  `
})
export class Player {
  showGrid = signal(false);
  gridSize = signal('10px');

  grid() {
    this.showGrid.set(!this.showGrid());
  }

  contentCssList = computed(() => {
    return (this.showGrid() ? 'grid content' : 'content');
  });

  contentStyles = computed(() => {
    const styles: Record<string, string> = {};
    if (this.showGrid()) {
      styles['backgroundSize'] = `${this.gridSize()} ${this.gridSize()}`;
      styles['backgroundImage'] = 'linear-gradient(to right, #e1dede 1px, transparent 1px), linear-gradient(to bottom, #e1dede 1px, transparent 1px)';
    }
    return styles;
  });
}

/*
<button (click)="grid()" title="Grid">▦</button>
      <select [(ngModel)]="gridSize">
        <option value="1em">1em</option>
        <option value="10px">10px</option>
        <option value="20px">20px</option>
      </select>
 */
