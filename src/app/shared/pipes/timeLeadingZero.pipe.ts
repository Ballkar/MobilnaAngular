import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeadingZero'
})
export class TimeLeadingZeroPipe implements PipeTransform {

  transform(num: number): any {
    let s = num + '';
    while (s.length < 2) { s = '0' + s; }
    return s;
  }

}
