
export enum InputType {
  Text,
  Length,
  Color,
}
export type StylerInput = [string, InputType[]];

export default class Styler {
  // todo currently support only :root pseudo element
  root = getComputedStyle(document.documentElement);

  constructor(public readonly inputs: StylerInput[]) {
  }

  update() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    document.documentElement.style.setProperty('--color-initial', `rgb(${r},${g},${b})`);
  }
}
