import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { cloneDeep } from 'lodash';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { LabelFormComponent } from '../label-form/label-form.component';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-labelse-editing-popup',
  templateUrl: './labelse-editing-popup.component.html',
  styleUrls: ['./labelse-editing-popup.component.scss']
})
export class LabelseEditingPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  loadingState$: Subject<boolean> = new Subject();
  labels: LabelModel[];
  labels$: Observable<LabelModel[]>;
  constructor(
    private notifyService: SnotifyService,
    public dialogRef: MatDialogRef<LabelseEditingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public labelService: LabelService,
  ) { }

  ngOnInit() {
    this.labels$ = this.labelService.labels$.pipe(
      takeUntil(this.onDestroy$),
      map((labels) => cloneDeep(labels).filter(l => l.id)),
      tap(l => this.labels = l),
    );
  }

  remove(label: LabelModel) {
    this.loadingState$.next(true);
    return this.labelService.removeLabel(label).pipe(
      tap(() => this.loadingState$.next(false)),
      tap(() => this.notifyService.success('Etykieta została usunięta!')),
      switchMap(() => this.labelService.getLabels()),
    ).subscribe(labels => cloneDeep(labels).filter(l => l.id));
  }

  catchSave(labelFormComponent: LabelFormComponent) {
    labelFormComponent.clearValue();
  }

  save() {
    this.loadingState$.next(true);
    this.labelService.massEditLabel(this.labels).pipe(
      tap(() => this.loadingState$.next(false)),
      tap(() => this.notifyService.success('Etykiety zostały zaaktualizowane!')),
    ).subscribe(() => this.dialogRef.close(this.labels));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
