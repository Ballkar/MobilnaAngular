import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/shared/guards/can-deactivate-guard.service';
import { WorkersResolver } from '../workers/workers.resolver';
import { WorkComponent } from './work/work.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkComponent,
    resolve: {
      workers: WorkersResolver
    },
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
