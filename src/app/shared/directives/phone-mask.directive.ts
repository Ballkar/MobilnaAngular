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
    this.transform(this.ngControl.value, new KeyboardEvent(''));
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.transform(this.ngControl.value.slice(0, -1), event);
    } else {
      this.transform(this.ngControl.value + event.key, event);
    }
  }

  transform(data: string, event?: KeyboardEvent) {
    event.preventDefault();
    const newVal = this.phonePipe.transform(data);
    this.ngControl.control.setValue(newVal);
  }
}
