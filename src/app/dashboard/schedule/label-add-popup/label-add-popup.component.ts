import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-add-popup',
  templateUrl: './label-add-popup.component.html',
  styleUrls: ['./label-add-popup.component.scss']
})
export class LabelAddPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  loadingState$: Subject<boolean> = new Subject();
  labels: LabelModel[];
  labels$: Observable<LabelModel[]>;
  constructor(
    private notifyService: SnotifyService,
    public dialogRef: MatDialogRef<LabelAddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public labelService: LabelService,
  ) { }

  ngOnInit() {
  }

  save() {

  }

  close(label: LabelModel) {
    this.dialogRef.close(label);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
