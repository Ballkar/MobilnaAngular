import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-choose',
  templateUrl: './label-choose.component.html',
  styleUrls: ['./label-choose.component.scss']
})
export class LabelChooseComponent implements OnInit, OnDestroy {
  @Input() singleChoose = false;
  @Input() labelsChoosenIds: number[] = [];
  get isAnyLabelsChoosenOnInit() { return !!this.labelsChoosenIds[0] }
  @Output() labelsChanged: EventEmitter<LabelModel[]> = new EventEmitter();

  allLabel: LabelModel = { id: null, name: 'Wszystkie', color: 'yellow', active: false};
  labels: LabelModel[];

  onDestroy$: Subject<void> = new Subject();
  constructor(
    private labelService: LabelService,
  ) { }

  ngOnInit() {
    this.labelService.labels$.pipe(
      takeUntil(this.onDestroy$),
      tap(labels => this.labels = cloneDeep(labels)),
      map(labels => this.mapLabelsState(labels)),
    ).subscribe();
  }

  setNewLabelsActive(labelsToChoose: LabelModel[]) {
    this.labels.map(label => label.active = false);
    this.labels.forEach(label => label.active = !!labelsToChoose.find(l => l.id === label.id));
  }

  private mapLabelsState(labels: LabelModel[]): LabelModel[] {
    labels.map(label => label.active = false);

    if (this.singleChoose && this.isAnyLabelsChoosenOnInit) {
      const labelChosenOnInit = this.labels.find(label => label.id === this.labelsChoosenIds[0]);
      labelChosenOnInit.active = true;
    } else if(this.singleChoose && !this.isAnyLabelsChoosenOnInit) {
      this.labels[0].active = true;
    } else if(!this.singleChoose && !this.isAnyLabelsChoosenOnInit) {
      this.setAllLabel();
    } else {
      this.labelsChoosenIds.forEach(labelId => this.labels.find(l => l.id === labelId).active = true);
    }

    return labels;
  }

  // newLabelClick() {
  //   this.newLabelWasClicked.emit();
  // }

  // editClick() {
  //   this.editLabelsWasClicked.emit();
  // }

  changeLabelState(label: LabelModel) {
    this.allLabel.active = false;
    if (this.singleChoose) {
      this.labels.forEach(l => l.active = false);
      label.active = true;
      this.labelsChanged.emit([label]);
    } else {
      label.active = !label.active;
      const activeLabels = this.labels.filter(l => l.active);
      this.labelsChanged.emit(activeLabels);
    }
  }

  setAllLabel() {
    this.labels.forEach(label => label.active = false);
    this.allLabel.active = true;
    this.labelsChanged.emit(this.labels);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
