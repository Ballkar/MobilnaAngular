import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ConfirmPopupComponent, ConfirmPopupComponentData } from 'src/app/shared/modal/confirm-popup/confirm-popup.component';
import { WorkerModel } from '../worker.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss']
})

export class WorkerFormComponent implements OnInit, OnDestroy {
  @Input() worker: WorkerModel;
  @Output() workerChanged: EventEmitter<WorkerModel> = new EventEmitter();
  @Output() workerSaved: EventEmitter<WorkerModel> = new EventEmitter();
  @Output() workerRemoved: EventEmitter<WorkerModel> = new EventEmitter();
  form: FormGroup;
  onDestroy$: Subject<void> = new Subject();
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get colorCtrl() { return this.form.get('color') as FormControl; }

  constructor(
    private workerService: WorkerService,
    private notifyService: SnotifyService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.worker ? this.worker.name : '', Validators.required),
      color: new FormControl(this.worker ? this.worker.color : '#d1e8ff', Validators.required),
    });
    this.form.valueChanges.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe(worker => this.workerChanged.next({...this.worker, name: worker.name, color: worker.color}));
  }

  saveWorker() {
    return this.workerService.saveWorker(this.form.value).pipe(
      tap(() => this.notifyService.success('Pracownik został dodany!')),
    );
  }

  editWorker() {
    return this.workerService.editWorker({
      ...this.worker,
      color: this.colorCtrl.value,
      name: this.nameCtrl.value,
    }).pipe(
      tap(() => this.notifyService.success('Pracownik została zaktualizowany!')),
    );
  }

  clearValue() {
    this.form.reset();
    this.colorCtrl.setValue('#d1e8ff');
    this.nameCtrl.markAsUntouched();
    this.nameCtrl.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) { return; }
    let request: Observable<WorkerModel>;
    if (this.worker) {
      request = this.editWorker();
    } else {
      request = this.saveWorker();
    }

    request.subscribe(worker => this.workerSaved.emit(worker));
  }

  initRemove() {
    const data: ConfirmPopupComponentData = {
      confirm: 'tak',
      cancel: 'nie',
      text: 'Czy napewno chcesz usunąć tego Pracownika?',
      subtitle: `Spowoduje to usunięcie go z wszystkich spotkań.
      Wszystkie wizyty przypisane do tego pracownika będą istniały bez pracownika.`
    };
    const ref = this.dialog.open(ConfirmPopupComponent, { data });
    ref.afterClosed().pipe(
      filter((data: boolean) => !!data)
    ).subscribe(() => this.remove());
  }

  private remove() {
    this.workerService.removeWorker(this.worker).pipe(
      tap(() => this.workerRemoved.emit(this.worker)),
    ).subscribe(
      () => this.notifyService.success('Pracownik został usunięty!'),
      () => this.notifyService.error('Problem podczas usuwania pracownika!'),
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
