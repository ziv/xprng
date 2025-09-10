import {Component, ElementRef, input, model, OnInit, viewChild, ViewEncapsulation} from '@angular/core';
import {EditorState, type Extension} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
// import {javascript} from '@codemirror/lang-javascript';
import {json} from '@codemirror/lang-json';
import {autocompletion, CompletionContext, type CompletionResult, acceptCompletion} from '@codemirror/autocomplete';
// import {oneDark} from '@codemirror/theme-one-dark';
import {indentWithTab} from '@codemirror/commands';

const noSqlCompletions = [
  // Collection methods
  // 'find', 'findOne', 'insertOne', 'insertMany', 'updateOne', 'updateMany',
  // 'deleteOne', 'deleteMany', 'replaceOne', 'aggregate', 'countDocuments',
  // 'distinct', 'createIndex', 'dropIndex',

  // Query operators
  '$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin', '$exists',
  '$type', '$regex', '$options', '$all', '$elemMatch', '$size',

  // Update operators
  '$set', '$unset', '$inc', '$mul', '$rename', '$min', '$max', '$currentDate',
  '$push', '$pull', '$addToSet', '$pop', '$pullAll',

  // Aggregation operators
  '$match', '$group', '$sort', '$limit', '$skip', '$project', '$unwind',
  '$lookup', '$addFields', '$replaceRoot', '$out', '$merge',

  // Logical operators
  '$and', '$or', '$not', '$nor',

  // Array operators
  '$filter', '$map', '$reduce', '$slice', '$concatArrays',

  // Date operators
  '$dateToString', '$dateFromString', '$dateTrunc', '$dateAdd', '$dateDiff'
];

function noSqlAutocompletion(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/\$?\w*/);
  if (!word) return null;

  // const options = noSqlCompletions.map(completion => ({
  //   label: completion,
  //   type: completion.startsWith('$') ? 'keyword' : 'function'
  // }));

  const options = noSqlCompletions.map(completion => ({
    label: completion,
    type: 'keyword'
  }));

  return {
    from: word.from,
    options
  };
}


@Component({
  selector: 'xpr-no-sql-query',
  encapsulation: ViewEncapsulation.None,
  template: '<div #container class="editor-container"></div>',
  styles: `
    xpr-no-sql-query {
      display: block;
      overflow: hidden;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }

    .editor-container {
      height: 100%;
      width: 100%;
    }

    .cm-editor {
      height: 100%;
    }

    /*.cm-focused {*/
    /*  outline: none;*/
    /*}*/
  `
})
export class NoSqlQuery implements OnInit {
  private editor: EditorView | undefined;

  readonly code = model<string>('{}');
  readonly theme = input<Extension>();

  private readonly container = viewChild<ElementRef>('container');

  ngOnInit() {
    // const extensions: Extension[] = [
    //   javascript(),
    //   autocompletion({
    //     override: [noSqlAutocompletion]
    //   }),
    //   oneDark,
    //   // EditorView.theme({
    //   //   '&': {
    //   //     height: '100%'
    //   //   },
    //   //   '.cm-content': {
    //   //     padding: '12px',
    //   //     minHeight: '200px'
    //   //   },
    //   //   '.cm-editor': {
    //   //     fontSize: '14px'
    //   //   }
    //   // })
    // ];
    const extensions: Extension[] = [
      // javascript(),
      json(),
      autocompletion({
        override: [noSqlAutocompletion],
      }),
      keymap.of([
        {key: 'Tab', run: acceptCompletion}, // Optional: Bind Tab to accept completion
        indentWithTab // Optional: Allows Tab for indentation when no completions are active
      ]),
      // autocompletion({
      //   override: [noSqlAutocompletion]
      // }),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          this.code.set(update.state.doc.toString());
          // this.dispatchEvent(new CustomEvent('change', {
          //   detail: {value: update.state.doc.toString()}
          // }));
        }
      })
    ];
    const theme = this.theme();
    if (theme) {
      extensions.push(theme);
    }

    this.editor = new EditorView({
      parent: this.container()!.nativeElement,
      state: EditorState.create({
        doc: this.code(), // initialDoc
        extensions,
      })
    });
  }
}
