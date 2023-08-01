import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xpr-monaco',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="xpr-monaco"></div>`,
  styles: [
    `
    div.xpr-monaco {
      height: 100%;
    }
    `
  ]
})
export class MonacoComponent implements OnInit {
  constructor(private readonly el: ElementRef) {
  }

  ngOnInit() {

  }
}
