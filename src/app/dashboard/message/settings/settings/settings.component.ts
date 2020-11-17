import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  constructor(
    private messageSerive: MessageService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({

    });
    this.messageSerive.getMessagesSettings().subscribe(res => console.log(res));
  }

  onSubmit() {
    this.saved.emit();

  }

}
