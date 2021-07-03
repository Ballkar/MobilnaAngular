import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { filter, switchMap } from 'rxjs/operators';
import { WorkPopupComponentComponent } from '../../schedule/work-popup-component/work-popup-component.component';

@Component({
  selector: 'app-schedule-cube',
  templateUrl: './schedule-cube.component.html',
  styleUrls: ['./schedule-cube.component.scss']
})
export class ScheduleCubeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private notifierService: SnotifyService,
  ) { }

  ngOnInit(): void {
  }


  addWork() {
    console.log('test');

    const work = {
      start: new Date(),
      worker: null,
    };
    const ref = this.dialog.open(WorkPopupComponentComponent, { data: work });
    ref.afterClosed().pipe(
      filter(data => !!data),
    ).subscribe(
      () => this.notifierService.success('Wizyta zostałą dodana!'),
      () => this.notifierService.error('Problem podczas dodawania wizyty.'),
    );
  }
}
