import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { RemindPlanPreviewComponent } from '../remind-plan-preview/remind-plan-preview.component';
import { RemindPlanModel } from '../models/remindPlan.model';
import { map } from 'rxjs/operators';
import { CustomerModel } from 'src/app/dashboard/customers/customer.model';
import { UserService } from 'src/app/dashboard/user/user.service';
import { TutorialService } from 'src/app/dashboard/services/tutorial.service';
import { SchemaService } from '../../services/schema.service';
import { PlanSchema, PlanSchemaBodyTypes, PLANTYPES } from '../../models/PlanSchema.model';

@Component({
  selector: 'app-remind-plan-form',
  templateUrl: './remind-plan-form.component.html',
  styleUrls: ['./remind-plan-form.component.scss']
})
export class RemindPlanFormComponent implements OnInit {

  @Input() plan: RemindPlanModel;
  @Output() emitPlan: EventEmitter<RemindPlanModel> = new EventEmitter();
  isLocked = false;
  BodyElementTypes = PlanSchemaBodyTypes;
  form: FormGroup;
  get schemaIdCtrl() { return this.form.get('schema_id') as FormControl; }
  get activeCtrl() { return this.form.get('active') as FormControl; }
  private customerSelected: CustomerModel;
  schemasAvailable: PlanSchema[] = [];

  constructor(
    private notificationService: SnotifyService,
    private dialog: MatDialog,
    private authService: UserService,
    private tutorialService: TutorialService,
    private schemaService: SchemaService,
  ) { }

  ngOnInit() {
    this.tutorialLogic();
    this.form = new FormGroup({
      schema_id: new FormControl(this.plan.schema_id, Validators.required),
      active: new FormControl(this.plan.active, Validators.required),
    });

    this.schemasAvailable = this.schemaService.schemas.filter(schema => schema.type === PLANTYPES.REMIND);
  }

  tutorialLogic() {
    if(!this.authService.loggedUser.tutorials.includes(this.tutorialService.messageDetailTour.tourId)) {
      setTimeout(() => this.tutorialService.startMessageDetailTutorial(), 800);
    }
  }

  preview() {
    if (this.form.invalid) {
      this.notificationService.error('Błąd w formularzu');
      return;
    }
    const ref = this.dialog.open(RemindPlanPreviewComponent, { data: { schemaId: this.schemaIdCtrl.value, customer: this.customerSelected } });

    ref.afterClosed().pipe(
      map(() => ref.componentInstance.customerCtrl.value),
    ).subscribe((customer) => this.customerSelected = customer);
  }

  onSubmit() {
    if(this.form.invalid) {
      this.notificationService.error('Błąd w formularzu');
      return;
    }

    this.emitPlan.emit(this.form.value);

  }
}
