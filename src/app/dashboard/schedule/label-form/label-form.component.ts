import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { LabelModel } from '../label.model';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.scss']
})

export class LabelFormComponent implements OnInit, OnDestroy {
  @Input() label: LabelModel;
  @Output() labelChanged: EventEmitter<LabelModel> = new EventEmitter();
  @Output() labelSaved: EventEmitter<LabelModel> = new EventEmitter();
  form: FormGroup;
  onDestroy$: Subject<void> = new Subject();
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get colorCtrl() { return this.form.get('color') as FormControl; }

  constructor(
    private labelService: LabelService,
    private notifyService: SnotifyService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.label ? this.label.name : '', Validators.required),
      color: new FormControl(this.label ? this.label.color : 'white', Validators.required),
    });
    this.form.valueChanges.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe(label => this.labelChanged.next({...this.label, name: label.name, color: label.color}));
  }

  saveLabel() {
    return this.labelService.saveLabel(this.form.value).pipe(
      tap(() => this.notifyService.success('Etykieta została dodana!')),
    );
  }

  editLabel() {
    return this.labelService.editLabel({
      ...this.label,
      color: this.colorCtrl.value,
      name: this.nameCtrl.value,
    }).pipe(
      tap(() => this.notifyService.success('Etykieta została zaktualizowana!')),
    );
  }

  clearValue() {
    this.form.reset();
    this.colorCtrl.setValue('white');
    this.nameCtrl.markAsUntouched();
    this.nameCtrl.updateValueAndValidity();
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

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
