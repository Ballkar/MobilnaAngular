import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.scss']
})

export class LabelFormComponent implements OnInit {
  @Input() label: LabelModel;
  @Output() labelSaved: EventEmitter<LabelModel> = new EventEmitter();
  form: FormGroup;
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get colorCtrl() { return this.form.get('color') as FormControl; }

  constructor(
    private labelService: LabelService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.label ? this.label.name : '', Validators.required),
      color: new FormControl(this.label ? this.label.color : '', Validators.required),
    });
  }

  saveLabel() {
    return this.labelService.saveWork(this.form.value);
  }

  editLabel() {
    return this.labelService.editLabel({
      ...this.label,
      color: this.colorCtrl.value,
      name: this.nameCtrl.value,
    });
  }

  submit() {
    if (this.form.invalid) { return; }
    let request: Observable<LabelModel>;
    if (this.label) {
      request = this.editLabel();
    } else {
      request = this.saveLabel();
    }

    request.subscribe(label => this.labelSaved.emit(label));
  }
}
