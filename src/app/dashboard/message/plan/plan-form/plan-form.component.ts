import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, map, concatMap } from 'rxjs/operators';
import { MessagePlan, MessageSchemaModel, TIMETYPES,  } from '../../message.model';
import { MessageSchemaService } from '../../schemas/messageSchema.service';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  TIMETYPES = TIMETYPES;
  filteredSchemas$: Observable<MessageSchemaModel[]>;
  state: 'add' | 'edit';
  form: FormGroup;
  @Input() plan: MessagePlan;
  @Input() ableToRemove: boolean;
  @Output() planSubmitted: EventEmitter<MessagePlan> = new EventEmitter();
  @Output() schemaRemoved: EventEmitter<void> = new EventEmitter();

  get schemaCtrl() { return this.form.get('schema') as FormControl; }
  get timeTypeCtrl() { return this.form.get('timeType') as FormControl; }
  get activeCtrl() { return this.form.get('active') as FormControl; }
  get hourCtrl() { return this.form.get('hour') as FormControl; }
  get minuteCtrl() { return this.form.get('minute') as FormControl; }

  constructor(
    private planService: PlanService,
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

  remove() {
    // this.planService.deleteSchema(this.plan.id).subscribe(() => this.planRemoved.emit());
  }

  onSubmit() {
    if (this.form.invalid) { return false; }

    if (this.state === 'add') {
      this.planService.add(this.form.value).subscribe(res => this.planSubmitted.emit(res));
    } else {
      this.planService.updatePlan({...this.form.value, id: this.plan.id}).subscribe(res => this.planSubmitted.emit(res));
    }
  }
}
