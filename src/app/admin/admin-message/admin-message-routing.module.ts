import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plans',
    // component: PlansComponent,
  },
  {
    path: 'plans',
    component: PlansComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMessageRoutingModule { }
