import { Type } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

// todo complete all supported elements
export enum FormElementType {
  Range = 'range',
  Number = 'number',
  Checkbox = 'checkbox',
  Color = 'color',
  Text = 'text',
  Select = 'select',
  Email = 'email',
  Date = 'date',
  Time = 'time',
  Custom = 'custom'
}

export interface FormInputDescriptor<T = unknown> {
  type: FormElementType;
  label: string;
  control: string;
  validators?: ValidatorFn[];
  value?: T;
  condition?: (value: Record<string, unknown>) => boolean;
}

export interface SimpleFormDescriptor {
  legend: string;
  inputs: FormInputDescriptor[];
}

export class SimpleControl extends FormControl {
  descriptor!: FormInputDescriptor;
}

export class SimpleGroup extends FormGroup {
  legend?: string;
}

export function create({legend, inputs}: SimpleFormDescriptor) {
  for (const desc of inputs) {
    // todo defaults + validators
    const ctrl = new SimpleControl();
    ctrl.descriptor = desc;
  }
}

export interface FormElementItem<T = unknown> {
  type: FormElementType;
  label: string;
  control: string;

  validators?: AsyncValidatorFn[];
  condition?: (value: Record<string, unknown>) => boolean;
  value?: T;
}


export interface FormElementRange extends FormElementItem {
  min: number;
  max: number;
  step?: number;
}

export interface FormElementNumber extends FormElementItem {
  min?: number;
  max?: number;
}

export interface FormElementCheckbox extends FormElementItem {
}

export interface FormElementColor extends FormElementItem {
}

export interface FormElementText extends FormElementItem {
  placeholder?: string;
}

export interface FormElementEmail extends FormElementItem {
}

export interface FormElementDate extends FormElementItem {
}

export interface FormElementTime extends FormElementItem {
}

export interface FormElementCustom extends FormElementItem {
  cmp: Type<any>; // provide specific input
}

export interface FormElementSelect extends FormElementItem {
  options: {
    value: string | number | boolean | object;
    label: string;
  }[];
}

export type FormElements =
  & FormElementSelect
  & FormElementText
  & FormElementColor
  & FormElementCheckbox
  & FormElementRange
  & FormElementNumber
  & FormElementEmail
  & FormElementDate
  & FormElementTime
  & FormElementCustom;

export type FormElement =
  | FormElementSelect
  | FormElementText
  | FormElementColor
  | FormElementCheckbox
  | FormElementRange
  | FormElementNumber
  | FormElementEmail
  | FormElementDate
  | FormElementTime
  | FormElementCustom;


export class SimpleFormControl extends FormControl {
  constructor(public readonly desc: FormElement) {
    super(undefined !== desc.value ? desc.value : DefaultMap[desc.type], desc.validators ?? [] as AsyncValidatorFn[]);
  }
}

export class SimpleFormGroup extends FormGroup<{ [x: string]: SimpleFormControl }> {

}

const DefaultMap: Record<FormElementType, unknown> = {
  [FormElementType.Checkbox]: true,
  [FormElementType.Range]: 0,
  [FormElementType.Number]: 0,
  [FormElementType.Text]: '',
  [FormElementType.Email]: '',
  [FormElementType.Date]: {},
  [FormElementType.Time]: {},
  [FormElementType.Select]: '',
  [FormElementType.Color]: '#FF00FF',
  [FormElementType.Custom]: '',
};

export function toForm(items: FormElement[]): SimpleFormGroup {
  const group: { [x: string]: SimpleFormControl } = {};
  for (const fe of items) {
    group[fe.control] = new SimpleFormControl(fe);
  }
  return new SimpleFormGroup(group);
}
