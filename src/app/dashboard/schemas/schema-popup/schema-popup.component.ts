import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageSchemaModel } from '../../message/message.model';

@Component({
  selector: 'app-schema-popup',
  templateUrl: './schema-popup.component.html',
  styleUrls: ['./schema-popup.component.scss']
})
export class SchemaPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SchemaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public schema?: MessageSchemaModel,
  ) { }

  ngOnInit() {
  }

  close(work: MessageSchemaModel) {
    this.dialogRef.close(work);
  }
}
