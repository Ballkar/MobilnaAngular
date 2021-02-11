import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LabelModel } from './label.model';
import { LabelService } from './label.service';

@Injectable({
  providedIn: 'root'
})
export class LabelsResolver implements Resolve<LabelModel[]> {
  constructor(
    private labelService: LabelService,
    ) { }

  resolve() {
    return this.labelService.getLabels();
  }
}
