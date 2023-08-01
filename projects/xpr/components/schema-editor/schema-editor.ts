import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  type OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { jsonSchema } from 'codemirror-json-schema';

// todo complete this type
export type Schema = any;

@Component({
  standalone: true,
  selector: 'xpr-schema-editor',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemaEditor implements OnInit {
  view?: EditorView;
  focused = false;

  @Input() schema?: Schema;
  @Input() extensions: Extension[] = [];
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  constructor(private readonly el: ElementRef,
              private readonly zone: NgZone) {
  }

  ngOnInit() {
    if (!this.schema) {
      throw new Error('unable to render xpr-schema-editor without a schema definition');
    }
    const parent = this.el.nativeElement,
      doc = this.value,
      extensions = [
        ...this.extensions,
        // todo do we need the basicSetup?!
        // todo do we need more extensions?!
        basicSetup,
        jsonSchema(this.schema),
        EditorView.updateListener.of((e: ViewUpdate) => this.valueChange.emit(e.state.doc.toString())),
      ];

    const factory = () => new EditorView({parent, state: EditorState.create({doc, extensions})});

    this.view = this.zone.runOutsideAngular<EditorView>(factory);
    // todo clean after those event listeners
    this.view.contentDOM.addEventListener('focus', () => this.focused = true);
    this.view.contentDOM.addEventListener('blur', () => this.focused = false);
  }
}
