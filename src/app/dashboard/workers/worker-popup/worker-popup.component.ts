import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { WorkerModel } from '../worker.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-popup',
  templateUrl: './worker-popup.component.html',
  styleUrls: ['./worker-popup.component.scss']
})
export class WorkerPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  constructor(
    private notifyService: SnotifyService,
    private dialogRef: MatDialogRef<WorkerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public worker: WorkerModel,
  ) { }

  ngOnInit() {
  }

  save() {

  }

  close(worker: WorkerModel) {
    this.dialogRef.close(worker);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
