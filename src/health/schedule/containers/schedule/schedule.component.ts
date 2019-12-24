import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { ScheduleService } from '../../../shared/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  date$: Observable<Date>;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.scheduleService.schedule$.subscribe());
    this.date$ = this.store.select('date');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
