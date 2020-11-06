import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let newVal = value.replace(/\D/g, '');
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1-$2-$3');
    } else {
      newVal = newVal.slice(0, -1).replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1-$2-$3');
    }
    return newVal;
  }

}
