import { Compiler, Component, inject, signal } from "@angular/core";
import { JitEvaluator } from "@angular/compiler";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ex-describe",
  host: {
    class: "block w-full p-4",
  },
  styles: `

    textarea {
      border: 1px solid #ccc;
    }
  `,
  imports: [FormsModule],
  template: `
    <h1>Describe</h1>
    <textarea class="w-full" [(ngModel)]="tpl"></textarea>

    <div>{{ tpl() }}</div>
  `,
})
export default class Describe {
  compiler = inject(Compiler);

  tpl = signal("");

  //
  compile(template: string) {
  }
}
