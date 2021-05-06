import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'history',
    loadChildren : () => import('./history/history.module').then(m => m.HistoryModule),
  },
  {
    path: 'plans',
    loadChildren : () => import('./plans/plans.module').then(m => m.PlansModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
