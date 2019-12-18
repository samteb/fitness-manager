import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth.guard';

const routes: Routes = [
  { path: 'schedule', canActivate: [ AuthGuard ], loadChildren: './schedule/schedule.module#ScheduleModule'},
  { path: 'meals', canActivate: [ AuthGuard ], loadChildren: './meals/meals.module#MealsModule'},
  { path: 'workouts', canActivate: [ AuthGuard ], loadChildren: './workouts/workouts.module#WorkoutsModule'}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HealthRoutingModule {}
