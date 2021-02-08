import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { LabelModel } from '../label.model';

@Component({
  selector: 'app-labelse-editing-popup',
  templateUrl: './labelse-editing-popup.component.html',
  styleUrls: ['./labelse-editing-popup.component.scss']
})
export class LabelseEditingPopupComponent implements OnInit {

  labels: LabelModel[];
  constructor(
    public dialogRef: MatDialogRef<LabelseEditingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public labels$: Observable<LabelModel[]>,
  ) { }

  ngOnInit() {
    this.labels$.subscribe(res => this.labels = res);
  }

  save() {
    this.dialogRef.close(this.labels);
  }
}
