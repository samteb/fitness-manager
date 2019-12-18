import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HealthRoutingModule
  ]
})
export class HealthModule {}
