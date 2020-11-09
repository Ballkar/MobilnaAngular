import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({

    });
  }

  onSubmit() {
    this.saved.emit();

  }

}
