import vars from './vars';

export enum InputType {
  Text,
  Length,
  Color,
}

export interface StyleDescriptor {
  key: string;
  type: number;
  value: string;
  unit?: string;
}

export default class Styler {
  styles: StyleDescriptor[] = structuredClone(vars);
  el!: HTMLElement;

  update() {
    console.log('update', this.el);
    if (!this.el) {
      return;
    }
    for (const s of this.styles) {
      // @ts-ignore
      const value = s.unit ? s.value + s.unit : s.value;
      this.el.style.setProperty(s.key, value);
    }
  }
}
