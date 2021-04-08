import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { WorkerModel } from '../worker.model';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-choose',
  templateUrl: './worker-choose.component.html',
  styleUrls: ['./worker-choose.component.scss']
})
export class WorkerChooseComponent implements OnInit, OnDestroy {
  @Input() singleChoose = false;
  @Input() workersChoosenIds: number[] = [];
  get isAnyworkersChoosenOnInit() { return !!this.workersChoosenIds[0] }
  @Output() workersChanged: EventEmitter<WorkerModel[]> = new EventEmitter();

  allWorker: WorkerModel = { id: null, name: 'Wszystkie', color: 'yellow', active: false};
  workers: WorkerModel[];

  onDestroy$: Subject<void> = new Subject();
  constructor(
    private workerService: WorkerService,
  ) { }

  ngOnInit() {
    this.workerService.workers$.pipe(
      takeUntil(this.onDestroy$),
      tap(workers => this.workers = cloneDeep(workers)),
      map(workers => this.mapWorkerState(workers)),
    ).subscribe();
  }

  setNewWorkersActive(workersToChoose: WorkerModel[]) {
    this.workers.map(worker => worker.active = false);
    this.workers.forEach(worker => worker.active = !!workersToChoose.find(l => l.id === worker.id));
  }

  private mapWorkerState(workers: WorkerModel[]): WorkerModel[] {
    workers.map(worker => worker.active = false);

    if (this.singleChoose && this.isAnyworkersChoosenOnInit) {
      const workerChosenOnInit = this.workers.find(worker => worker.id === this.workersChoosenIds[0]);
      workerChosenOnInit.active = true;
    } else if(this.singleChoose && !this.isAnyworkersChoosenOnInit) {
      this.workers[0].active = true;
    } else if(!this.singleChoose && !this.isAnyworkersChoosenOnInit) {
      this.setAllWorkers();
    } else {
      this.workersChoosenIds.forEach(workerId => this.workers.find(l => l.id === workerId).active = true);
    }

    return workers;
  }

  // newWorkerClick() {
  //   this.newWorkerWasClicked.emit();
  // }

  // editClick() {
  //   this.editWorkersWasClicked.emit();
  // }

  changeWorkerState(worker: WorkerModel) {
    this.allWorker.active = false;
    if (this.singleChoose) {
      this.workers.forEach(l => l.active = false);
      worker.active = true;
      this.workersChanged.emit([worker]);
    } else {
      worker.active = !worker.active;
      const activeWorkers = this.workers.filter(l => l.active);
      this.workersChanged.emit(activeWorkers);
    }
  }

  setAllWorkers() {
    this.workers.forEach(worker => worker.active = false);
    this.allWorker.active = true;
    this.workersChanged.emit(this.workers);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
