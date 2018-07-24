import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charstrim'
})
export class CharstrimPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.slice(3, 8);
  }

}
