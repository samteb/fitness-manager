import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule'},
  { path: 'meals', loadChildren: './meals/meals.module#MealsModule'},
  { path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule'}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HealthRoutingModule {}
