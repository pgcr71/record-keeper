import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr?: string): any {
    if (attr) {
      return items.reduce((sum, next) => sum + Number(get(next, attr, 0)), 0);
    } else {
      return items.reduce((sum, next) => sum + next, 0)
    }
  }
}
