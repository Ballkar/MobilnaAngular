import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersResolver } from './works.resolver';
import { WorkComponent } from './work/work.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkComponent,
    resolve: {
      workers: WorkersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
