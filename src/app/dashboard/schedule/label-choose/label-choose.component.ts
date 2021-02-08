import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, tap } from 'rxjs/operators';
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
  @Output() newLabelWasClicked: EventEmitter<void> = new EventEmitter();
  @Output() editLabelsWasClicked: EventEmitter<void> = new EventEmitter();
  @Output() labelChanged: EventEmitter<LabelModel> = new EventEmitter();
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
    this.labelService.getLabels().pipe(
      tap(labels => this.labels = [{color: this.labelService.voidLabelColor, id: null, name: 'Brak', active: false}, ...labels]),
      map(labels => this.mapLabelsState(labels)),
    ).subscribe();
  }

  private mapLabelsState(labels: LabelModel[]): LabelModel[] {
    labels.map(label => label.active = false);

    if (this.singleChoose) {
      if (this.labelsChoosenIds[0]) {
        const labelChosenOnInit = this.labels.find(label => label.id === this.labelsChoosenIds[0]);
        labelChosenOnInit.active = true;
      } else {
        this.labels[0].active = true;
      }
    } else {
      this.labelsChoosenIds.forEach(labelId => this.labels.find(l => l.id === labelId).active = true);
      if (!this.labelsChoosenIds[0]) {
        this.allLabel.active = true;
        this.labelsChanged.emit(this.labels);
      }
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
      this.labelChanged.emit(label);
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
