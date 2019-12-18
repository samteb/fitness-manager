import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './containers/workouts/workouts.component';

const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [ WorkoutsComponent ]
})
export class WorkoutsModule {}
