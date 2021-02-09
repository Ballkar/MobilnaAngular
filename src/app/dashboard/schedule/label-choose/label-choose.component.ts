import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { first, map, tap } from 'rxjs/operators';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-choose',
  templateUrl: './label-choose.component.html',
  styleUrls: ['./label-choose.component.scss']
})
export class LabelChooseComponent implements OnInit {
  @Input() singleChoose = false;
  @Input() preventNewLabel = false;
  @Input() preventEditing = false;

  @Input() labelsChoosenIds: number[] = [];
  get isAnyLabelsChoosenOnInit() { return !!this.labelsChoosenIds[0] }

  @Output() newLabelWasClicked: EventEmitter<void> = new EventEmitter();
  @Output() editLabelsWasClicked: EventEmitter<void> = new EventEmitter();
  @Output() labelsChanged: EventEmitter<LabelModel[]> = new EventEmitter();

  allLabel: LabelModel = {color: 'yellow', id: null, name: 'Wszystkie', active: false};
  labels: LabelModel[];
  constructor(
    private labelService: LabelService,
  ) { }

  ngOnInit() {
    this.getLabels();
  }

  getLabels() {
    this.labelService.labels$.pipe(
      first(),
      tap(labels => this.labels = cloneDeep(labels)),
      map(labels => this.mapLabelsState(labels)),
    ).subscribe();
  }

  setNewLabels(labelsToChoose: LabelModel[]) {
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
      this.allLabel.active = true;
    } else {
      this.labelsChoosenIds.forEach(labelId => this.labels.find(l => l.id === labelId).active = true);
    }

    return labels;
  }

  newLabelClick() {
    this.newLabelWasClicked.emit();
  }

  editClick() {
    this.editLabelsWasClicked.emit();
  }

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
}
