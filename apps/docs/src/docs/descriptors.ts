import {DocDescriptor} from '@xprng/docs';

export default [
  {
    id: 'markdown',
    name: 'Markdown XpdDocumentation',
    description: 'XpdDocumentation for the Markdown component.',
    overview: "/docs.overview.md",
    props: [
      {
        id: 'src',
        name: 'src',
        type: 'string',
        description: 'Path to a markdown file to load. Do not use with `code`.',
        value: 'https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/apps/docs/public/example.md',
      },
      {
        id: 'content',
        name: 'content',
        type: 'text',
        description: 'Markdown code to render. Do not use with `src`',
        value: '',
      },
    ],
  },
  {
    id: 'code',
    name: 'Code Highlighter',
    overview: "/docs.overview.md",
    props: [
      {
        id: 'src',
        name: 'src',
        type: 'string',
        description: 'Path to a source file to load.',
        value: 'https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/apps/docs/public/example.js',
      },
      {
        id: 'content',
        name: 'content',
        type: 'text',
        description: 'Source code to render.',
        value: '',
      },
      {
        id: 'lang',
        name: 'lang',
        type: 'string',
        description: 'Language of the source code for syntax highlighting.',
        value: 'javascript',
      }
    ],
  },
  {
    id: 'slides',
    name: 'Slides XpdDocumentation',
    description: 'XpdDocumentation for the Markdown component',
    overview: "/docs.overview.md",
    props: [
      {
        id: 'cyclic',
        name: 'cyclic',
        type: 'boolean',
        description: 'Enable cyclic navigation through slides',
        value: false,
      },
      {
        id: 'interval',
        name: 'interval',
        type: 'number',
        description: 'Interval in milliseconds for automatic slide transitions',
        value: 5000,
      }
    ]
  },
  {
    id: 'example',
    name: 'Pico Documentation',
    props: [
      {
        id: 'open',
        name: 'open',
        type: 'boolean',
        description: 'Open the accordion',
        value: true,
      },
      {
        id: 'disabled',
        name: 'disabled',
        type: 'boolean',
        description: 'Disable the button',
        value: false,
      },
      {
        id: 'content',
        name: 'text',
        type: 'string',
        description: 'Button text',
        value: 'click me',
      },
      {
        id: 'type',
        name: 'type',
        type: 'list',
        description: 'Button type',
        value: 'primary',
        options: [
          {label: 'Primary', value: 'primary'},
          {label: 'Secondary', value: 'secondary'},
          {label: 'Contrast', value: 'contrast'},
        ]
      }
    ],
  },
] as DocDescriptor[];
