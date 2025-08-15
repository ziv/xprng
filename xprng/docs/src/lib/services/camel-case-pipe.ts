import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "camelCase",
  pure: true,
})
export class CamelCasePipe implements PipeTransform {
  transform(value: string) {
    const result = value.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
