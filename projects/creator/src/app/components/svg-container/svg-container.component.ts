import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

const RATIO = 0.5394;

@Component({
  selector: 'creator-svg-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         [attr.viewBox]="viewBox"
         [attr.width]="w"
         [attr.height]="h">
      <g stroke-linecap="round" transform="translate(10 10) rotate(0 119.607421875 230.236328125)">
        <path
          d="M32 0 M32 0 C75.7 -0.29, 123.98 0, 207.21 0 M32 0 C69.19 0.17, 106.7 -0.05, 207.21 0 M207.21 0 C228.56 -1.49, 238.73 8.84, 239.21 32 M207.21 0 C226.85 -1.8, 241 12.76, 239.21 32 M239.21 32 C239.76 168.39, 237.96 307.27, 239.21 428.47 M239.21 32 C239.18 190.29, 240.14 348.11, 239.21 428.47 M239.21 428.47 C240.33 451.24, 228.02 458.81, 207.21 460.47 M239.21 428.47 C237.58 448.55, 228.11 461.8, 207.21 460.47 M207.21 460.47 C137.59 460.9, 71.76 457.79, 32 460.47 M207.21 460.47 C169.86 460.86, 134.09 459.89, 32 460.47 M32 460.47 C10.48 461.01, 1.02 451.47, 0 428.47 M32 460.47 C8.38 458.69, -1.46 449, 0 428.47 M0 428.47 C-1.74 284.29, -1.32 140.28, 0 32 M0 428.47 C-0.05 322.23, 0.63 214.62, 0 32 M0 32 C-0.15 10.02, 9.91 1.26, 32 0 M0 32 C-0.04 8.39, 11.54 1.61, 32 0"
          stroke="#1e1e1e" stroke-width="1" fill="none"></path>
      </g>
    </svg>

  `,
  styles: []
})
export class SvgContainerComponent {
  w = 500;
  h = 900;

  get viewBox() {
    return `0 0 ${this.w} ${this.h}`;
  }
  @Input() set width(w: number) {
    this.w = w;
    this.h = w / RATIO;
  }

  @Input() set height(h: number) {
    this.h = h;
    this.w = h * RATIO;
  }
}
