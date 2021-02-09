import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabelsResolver } from './labels.resolver';
import { WorkComponent } from './work/work.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkComponent,
    resolve: {
      labels: LabelsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
