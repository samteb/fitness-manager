import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './containers/schedule/schedule.component';

const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [ ScheduleComponent ]
})
export class ScheduleModule {}
