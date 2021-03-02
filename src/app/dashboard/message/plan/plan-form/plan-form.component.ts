import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { startWith, debounceTime, map, concatMap, finalize, tap } from 'rxjs/operators';
import { MessagePlan, MessageSchemaModel, TIMETYPES,  } from '../../message.model';
import { MessageSchemaService } from '../../schemas/messageSchema.service';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  isLocked = false;
  TIMETYPES = TIMETYPES;
  filteredSchemas$: Observable<MessageSchemaModel[]>;
  state: 'add' | 'edit';
  form: FormGroup;
  @Input() plan: MessagePlan;
  @Input() ableToRemove: boolean;
  @Output() planSubmitted: EventEmitter<MessagePlan> = new EventEmitter();
  @Output() planRemoved: EventEmitter<void> = new EventEmitter();

  get schemaCtrl() { return this.form.get('schema') as FormControl; }
  get timeTypeCtrl() { return this.form.get('timeType') as FormControl; }
  get activeCtrl() { return this.form.get('active') as FormControl; }
  get hourCtrl() { return this.form.get('hour') as FormControl; }
  get minuteCtrl() { return this.form.get('minute') as FormControl; }

  constructor(
    private planService: PlanService,
    private notifyService: SnotifyService,
    private schemaService: MessageSchemaService,
  ) { }

  ngOnInit() {
    this.state = this.plan ? 'edit' : 'add';

    this.form = new FormGroup({
      schema: new FormControl(this.plan ? this.plan.schema : null, Validators.required),
      timeType: new FormControl(this.plan ? this.plan.timeType : TIMETYPES.dayBefore, Validators.required),
      active: new FormControl(this.plan ? this.plan.active : false, Validators.required),
      hour: new FormControl(this.plan ? this.plan.hour : 9, Validators.required),
      minute: new FormControl(this.plan ? this.plan.minute : 0, Validators.required),
    });

    this.filteredSchemas$ = this.schemaCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => typeof value === 'string' ? value : value.name),
      concatMap(name => this.schemaService.getSchemas(null, name)),
      map(res => res.items)
    );
  }


  newCustomer(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  displayFnMessage(schema: MessageSchemaModel): string {
    return schema && schema.name ? `${schema.name}` : '';
  }

  autocompleteBlur(input) {
    input.value = this.schemaCtrl.value && this.schemaCtrl.value.name ? this.schemaCtrl.value.name : '';
  }

  remove() {
    this.planService.deletePlan(this.plan).pipe(
      tap(() => this.planRemoved.emit()),
    ).subscribe(() => this.notifyService.success('Plan został usunięty!'));
  }

  onSubmit() {
    if (this.form.invalid) { return false; }
    this.isLocked = true;

    if (this.state === 'add') {
      this.planService.add(this.form.value).pipe(
        finalize(() => this.isLocked = false),
        tap(() => this.planSubmitted.emit()),
      ).subscribe(() => this.notifyService.success('Plan został dodany!'));
    } else {
      this.planService.updatePlan({...this.form.value, id: this.plan.id}).pipe(
        finalize(() => this.isLocked = false),
        tap(() => this.planSubmitted.emit()),
      ).subscribe(() => this.notifyService.success('Plan został zaktualizowany!'));
    }
  }
}
