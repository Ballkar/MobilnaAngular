import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  messages$ = this.messageService.getMessages();
  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

}
