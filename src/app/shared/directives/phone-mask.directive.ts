import { Directive, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective implements OnInit {
  constructor(private ngControl: NgControl) { }

  ngOnInit() {
    this.onInputChange(this.ngControl.value);
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event);
  }

  // @HostListener('keydown.backspace', ['$event'])
  // keydownBackspace(event) {
  //   this.onInputChange(event.target.value, true);
  // }


  onInputChange(event) {
    let newVal = event.replace(/\D/g, '');
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
    this.ngControl.valueAccessor.writeValue(newVal);
  }

}
