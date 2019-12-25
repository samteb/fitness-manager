import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { ScheduleService } from '../../../shared/services/schedule.service';
import { ScheduleItem } from '../../../../models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.scheduleService.schedule$.subscribe());
    this.subscriptions.add(this.scheduleService.selected$.subscribe());
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(data: any) {
    this.scheduleService.selectSection(data);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
