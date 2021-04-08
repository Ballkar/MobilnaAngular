import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WorkerModel } from './worker.model';
import { WorkerService } from './worker.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersResolver implements Resolve<WorkerModel[]> {
  constructor(
    private workerService: WorkerService,
    ) { }

  resolve() {
    return this.workerService.getWorkers();
  }
}
