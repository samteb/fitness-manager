import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { ScheduleService } from '../../../shared/services/schedule.service';
import { MealsService } from '../../../shared/services/meals.service';
import { WorkoutsService } from '../../../shared/services/workouts.service';
import { ScheduleItem } from '../../../../models/schedule.model';
import { Meal } from '../../../../models/meal.model';
import { Workout } from '../../../../models/workout.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  showAssignPopup = false;
  subscriptions = new Subscription();
  date$: Observable<Date>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduleItem[]>;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealService: MealsService,
    private workoutService: WorkoutsService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.scheduleService.items$.subscribe());
    this.subscriptions.add(this.scheduleService.selected$.subscribe());
    this.subscriptions.add(this.scheduleService.list$.subscribe());
    this.subscriptions.add(this.scheduleService.schedule$.subscribe());
    this.subscriptions.add(this.mealService.meals$.subscribe());
    this.subscriptions.add(this.workoutService.workouts$.subscribe());

    this.date$ = this.store.select('date');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    this.schedule$ = this.store.select('schedule');
  }

  setDate(date: Date) {
    this.scheduleService.setDate(date);
  }

  setSection(data: any) {
    this.showAssignPopup = true;
    this.scheduleService.setSection(data);
  }

  setItems(items: string[]) {
    this.scheduleService.setItems(items);
    this.closePopup();
  }

  closePopup() {
    this.showAssignPopup = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
