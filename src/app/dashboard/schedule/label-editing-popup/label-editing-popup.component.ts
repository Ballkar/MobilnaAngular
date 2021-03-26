import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep, debounce } from 'lodash';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmPopupComponent, ConfirmPopupComponentData } from 'src/app/shared/modal/confirm-popup/confirm-popup.component';
import { LabelAddPopupComponent } from '../label-add-popup/label-add-popup.component';
import { LabelFormComponent } from '../label-form/label-form.component';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-editing-popup',
  templateUrl: './label-editing-popup.component.html',
  styleUrls: ['./label-editing-popup.component.scss']
})
export class LabelEditingPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  loadingState$: Subject<boolean> = new Subject();
  labels: LabelModel[];
  labelsChanged$ = new Subject();
  constructor(
    private notifyService: SnotifyService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LabelEditingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public labelService: LabelService,
  ) { }

  ngOnInit() {
    this.getLabels();
    this.labelsChanged$.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(500),
      switchMap(() => this.save()),
    ).subscribe();
  }

  getLabels() {
    this.labels = cloneDeep(this.labelService.labels$.getValue()).filter(l => l.id);
  }

  remove(label: LabelModel) {
    const data: ConfirmPopupComponentData = {
      text: `Na pewno chcesz usunąc etykietę ${label.name}?`,
      subtitle: 'Spowoduje to usunięcie jej z wszystkich istniejących wizyt.',
    };
    const ref = this.dialog.open(ConfirmPopupComponent, {data} );

    ref.afterClosed().pipe(
      tap(console.log),
      filter(data => !!data),
    ).subscribe(() => this.removeApproved(label));
  }

  catchSave(labelFormComponent: LabelFormComponent) {
    labelFormComponent.clearValue();
  }

  openNewLabel() {
    const ref = this.dialog.open(LabelAddPopupComponent, { data: this.labelService } );

    ref.afterClosed().pipe(
      filter(data => !!data),
      tap(() => this.getLabels()),
    ).subscribe((label) => console.log(label));
  }

  catchLabelChange(newLabel: LabelModel, oldLabel: LabelModel) {
    if(newLabel.name.length === 0) {
      return;
    }
    oldLabel.color = newLabel.color;
    oldLabel.name = newLabel.name;
    this.labelsChanged$.next();
  }

  private save() {
    this.loadingState$.next(true);
    return this.labelService.massEditLabel(this.labels).pipe(
      tap(() => this.loadingState$.next(false)),
      tap(() => this.notifyService.success('Etykiety zostały zaaktualizowane!')),
    );
  }

  private removeApproved(label: LabelModel) {
    this.loadingState$.next(true);
    return this.labelService.removeLabel(label).pipe(
      tap(() => this.loadingState$.next(false)),
      tap(() => this.notifyService.success('Etykieta została usunięta!')),
      switchMap(() => this.labelService.getLabels()),
      tap(() => this.getLabels()),
    ).subscribe(labels => cloneDeep(labels).filter(l => l.id));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
