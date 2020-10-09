import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageModel } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() message: MessageModel;
  form: FormGroup;
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get textCtrl() { return this.form.get('text') as FormControl; }

  @Output() messageEditted = new EventEmitter<MessageModel>();
  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.form  = new FormGroup({
      name: new FormControl(this.message.name, Validators.required),
      text: new FormControl(this.message.text, Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.messageService.editMessage({...this.form.value, id: this.message.id})
        .subscribe(message => this.messageEditted.next(message));
    }
  }

}
