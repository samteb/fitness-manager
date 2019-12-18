import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MealsComponent } from './containers/meals/meals.component';

const ROUTES: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [ MealsComponent ]
})
export class MealsModule {}
