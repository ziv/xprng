import { type FormElement, FormElementType } from '@xpr/simple-form';


export const elementForm: FormElement[] = [
  {
    type: FormElementType.Text,
    label: 'type',
    control: 'type',
  },
  {
    type: FormElementType.Text,
    label: 'label',
    control: 'label',
  },
  {
    type: FormElementType.Text,
    label: 'control',
    control: 'control',
  },
];

export const textForm: FormElement[] = [
  ...elementForm,
  {
    type: FormElementType.Text,
    label: 'placeholder',
    control: 'placeholder'
  }
];
export const rangeForm: FormElement[] = [
  ...elementForm,
  {
    type: FormElementType.Number,
    label: 'min',
    control: 'min',
    value: 0,
  },
  {
    type: FormElementType.Number,
    label: 'max',
    control: 'max',
    value: 100,
  },
  {
    type: FormElementType.Number,
    label: 'step',
    control: 'step',
    value: 1,
  },
];

const FormMap = {
  [FormElementType.Range]: [
    ...elementForm,
    {
      type: FormElementType.Number,
      label: 'min',
      control: 'min',
      value: 0,
    },
    {
      type: FormElementType.Number,
      label: 'max',
      control: 'max',
      value: 100,
    },
    {
      type: FormElementType.Number,
      label: 'step',
      control: 'step',
      value: 1,
    },
  ]
};

export function formByType(type: FormElementType): FormElement[] {
  switch (type) {
    case FormElementType.Range:
      return rangeForm;
    case FormElementType.Text:
      return textForm;
    default:
      return elementForm;
  }
}
