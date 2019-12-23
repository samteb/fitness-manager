import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, EMPTY } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth.service';
import { Workout } from '../../../models/workout.model';

@Injectable()
export class WorkoutsService {
  workoutsRef: AngularFireList<any> = this.db.list(`workouts/${this.uid}`);
  workouts$: Observable<any[]> = this.workoutsRef.snapshotChanges().pipe(
    map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
    tap(next => this.store.set('workouts', next))
  );

  constructor(
    private authService: AuthService,
    private store: Store,
    private db: AngularFireDatabase
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string): Observable<Workout> {
    if (!key) {
      return EMPTY;
    }

    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts: Workout[]) => workouts.find(workout => workout.key === key))
    );
  }

  addWorkout(workout: Workout) {
    return this.workoutsRef.push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.workoutsRef.remove(key);
  }
}
