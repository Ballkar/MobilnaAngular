import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { WorkerModel } from '../worker.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-add-popup',
  templateUrl: './worker-add-popup.component.html',
  styleUrls: ['./worker-add-popup.component.scss']
})
export class WorkerAddPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  loadingState$: Subject<boolean> = new Subject();
  workers: WorkerModel[];
  workers$: Observable<WorkerModel[]>;
  constructor(
    private notifyService: SnotifyService,
    private dialogRef: MatDialogRef<WorkerAddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private workerService: WorkerService,
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
