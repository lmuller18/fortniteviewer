import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    nameFilter: string,
    typeFilter: string,
    rarityFilter: string
  ): any {
    if (!items || (!nameFilter && !typeFilter && !rarityFilter)) {
      return items;
    }

    return items.filter(
      item =>
        (item.type === typeFilter || typeFilter === '') &&
        (item.name.indexOf(nameFilter) !== -1 || nameFilter === '') &&
        (item.rarity === rarityFilter || rarityFilter === '')
    );
  }
}
