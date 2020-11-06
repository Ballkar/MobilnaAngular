import { Directive, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PhonePipe } from '../pipes/phone.pipe';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective implements OnInit {
  phonePipe: PhonePipe;
  constructor(private ngControl: NgControl) { }

  ngOnInit() {
    this.phonePipe = new PhonePipe();
    this.transform(this.ngControl.value);
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(data: string) {
    this.transform(data);
  }

  transform(data) {
    const newVal = this.phonePipe.transform(data);
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
