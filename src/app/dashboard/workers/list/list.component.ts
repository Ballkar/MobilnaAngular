import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { WorkerModel } from '../worker.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  workers: WorkerModel[];
  constructor(
    private workersService: WorkerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getWorkers();
  }

  getWorkers() {
    this.workersService.getWorkers().pipe(
      tap(workers => console.log(workers)),
    ).subscribe(workers => this.workers = workers);
  }

  addWorker() {

  }

  clicked() {

  }
}
