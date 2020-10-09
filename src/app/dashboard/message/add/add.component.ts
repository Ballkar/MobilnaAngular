import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageModel } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  form: FormGroup;
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get textCtrl() { return this.form.get('text') as FormControl; }

  @Output() messageSaved = new EventEmitter<MessageModel>();
  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.form  = new FormGroup({
      name: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.messageService.saveMessage({...this.form.value})
        .subscribe(message => this.messageSaved.next(message));
    }
  }
}
