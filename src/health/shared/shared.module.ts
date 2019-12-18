import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MealsService } from './services/meals.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    };
  }
}
