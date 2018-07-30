import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    value = value.split(/(?=[A-Z])/).join(' ');

    value = value.replace('top', 'top ');
    value = value.replace('%', ' %');

    const split = value.toLowerCase().split(' ');
    let toReturn = '';
    split.forEach(word => {
      toReturn += word.charAt(0).toUpperCase() + word.substring(1) + ' ';
    });

    toReturn = toReturn.replace('K/d', 'K/D');

    return toReturn.slice(0, -1);
  }
}
