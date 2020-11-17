import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlanService } from '../plan.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  constructor(
    private planService: PlanService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({

    });
  }

  onSubmit() {
    this.saved.emit();
  }
}
