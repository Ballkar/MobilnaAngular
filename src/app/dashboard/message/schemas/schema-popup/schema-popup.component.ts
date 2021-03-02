import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageSchemaModel } from '../../message.model';

@Component({
  selector: 'app-schema-popup',
  templateUrl: './schema-popup.component.html',
  styleUrls: ['./schema-popup.component.scss']
})
export class SchemaPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SchemaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {schema: MessageSchemaModel, ableToRemove: boolean},
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(true);
  }
}
