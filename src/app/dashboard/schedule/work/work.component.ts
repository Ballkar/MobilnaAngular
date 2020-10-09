import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../main-calendar/event.model';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  events: EventModel<{id: number}>[] = [
    {
      start: '2020-10-9 10:00:00',
      stop: '2020-10-9 12:00:00',
      title: 'Klientka',
      state: this.workService.clientState,
      data: {id: 0},
    },
  ];
  constructor(
    private workService: WorkService,
  ) { }

  ngOnInit() {
  }

}
