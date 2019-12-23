import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WorkoutsService } from '../../../shared/services/workouts.service';
import { Workout } from '../../../../models/workout.model';

@Component({
  selector: 'app-workout',
  styleUrls: ['workout.component.scss'],
  templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(param => this.workoutsService.getWorkout(param.id))
    );
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout() {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
