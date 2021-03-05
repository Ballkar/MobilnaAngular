import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StartPageComponent,
  },
  {
    path: 'history',
    loadChildren : () => import('./history/history.module').then(m => m.HistoryModule),
  },
  {
    path: 'schema',
    loadChildren : () => import('./schemas/schemas.module').then(m => m.SchemasModule),
  },
  {
    path: 'plan',
    loadChildren : () => import('./plan/plan.module').then(m => m.PlanModule),
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
