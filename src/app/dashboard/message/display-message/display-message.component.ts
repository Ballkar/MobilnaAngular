import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageModel } from '../message.model';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss']
})
export class DisplayMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DisplayMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public message: MessageModel,
  ) { }

  ngOnInit() {
  }

}
