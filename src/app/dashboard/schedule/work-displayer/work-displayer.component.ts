import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WorkModel } from '../work.model';

@Component({
  selector: 'app-work-displayer',
  templateUrl: './work-displayer.component.html',
  styleUrls: ['./work-displayer.component.scss']
})
export class WorkDisplayerComponent implements OnInit {
  @Input() work: WorkModel;

  old: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.old = moment(this.work.start).isBefore();
  }

}
