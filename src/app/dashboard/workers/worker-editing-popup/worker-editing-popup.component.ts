import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep, debounce } from 'lodash';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmPopupComponent, ConfirmPopupComponentData } from 'src/app/shared/modal/confirm-popup/confirm-popup.component';
import { WorkerPopupComponent } from '../worker-popup/worker-popup.component';
import { WorkerFormComponent } from '../worker-form/worker-form.component';
import { WorkerModel } from '../worker.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-editing-popup',
  templateUrl: './worker-editing-popup.component.html',
  styleUrls: ['./worker-editing-popup.component.scss']
})
export class WorkerEditingPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  loadingState$: Subject<boolean> = new Subject();
  workers: WorkerModel[];
  workersChanged$ = new Subject();
  constructor(
    private notifyService: SnotifyService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<WorkerEditingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public workerService: WorkerService,
  ) { }

  ngOnInit() {
    this.getWorker();
    this.workersChanged$.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(500),
      switchMap(() => this.save()),
    ).subscribe();
  }

  getWorker() {
    this.workers = cloneDeep(this.workerService.workers$.getValue()).filter(l => l.id);
  }

  remove(worker: WorkerModel) {
    const data: ConfirmPopupComponentData = {
      text: `Na pewno chcesz usunąc etykietę ${worker.name}?`,
      subtitle: 'Spowoduje to usunięcie jej z wszystkich istniejących wizyt.',
    };
    const ref = this.dialog.open(ConfirmPopupComponent, {data} );

    ref.afterClosed().pipe(
      tap(console.log),
      filter(data => !!data),
    ).subscribe(() => this.removeApproved(worker));
  }

  catchSave(workerFormComponent: WorkerFormComponent) {
    workerFormComponent.clearValue();
  }

  openNewWorker() {
    const ref = this.dialog.open(WorkerPopupComponent, { data: this.workerService } );

    ref.afterClosed().pipe(
      filter(data => !!data),
      tap(() => this.getWorker()),
    ).subscribe((worker) => console.log(worker));
  }

  catchWorkerChange(newWorker: WorkerModel, oldWorker: WorkerModel) {
    if(newWorker.name.length === 0) {
      return;
    }
    oldWorker.color = newWorker.color;
    oldWorker.name = newWorker.name;
    this.workersChanged$.next();
  }

  private save() {
    this.loadingState$.next(true);
    return this.workerService.massEditWorker(this.workers).pipe(
      tap(() => this.loadingState$.next(false)),
      tap(() => this.notifyService.success('Etykiety zostały zaaktualizowane!')),
    );
  }

  private removeApproved(worker: WorkerModel) {
    this.loadingState$.next(true);
    return this.workerService.removeWorker(worker).pipe(
      tap(() => this.loadingState$.next(false)),
      tap(() => this.notifyService.success('Etykieta została usunięta!')),
      switchMap(() => this.workerService.getWorkers()),
      tap(() => this.getWorker()),
    ).subscribe(workers => cloneDeep(workers).filter(l => l.id));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
