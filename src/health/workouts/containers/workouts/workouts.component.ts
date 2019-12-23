import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { WorkoutsService } from '../../../shared/services/workouts.service';
import { Workout } from '../../../../models/workout.model';

@Component({
  selector: 'app-workouts',
  styleUrls: ['workouts.component.scss'],
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.key);
  }
}
