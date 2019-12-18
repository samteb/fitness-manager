import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HealthRoutingModule,
    SharedModule.forRoot()
  ]
})
export class HealthModule {}
