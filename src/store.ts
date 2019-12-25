import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, distinctUntilChanged} from 'rxjs/operators';

import { User } from './models/user.model';
import { Meal } from './models/meal.model';
import { Workout } from './models/workout.model';
import { ScheduleItem } from './models/schedule.model';

export interface State {
  user: User;
  date: Date;
  schedule: ScheduleItem[];
  meals: Meal[];
  workouts: Workout[];
  [key: string]: any;
}

const state: State = {
  user: undefined,
  date: undefined,
  schedule: undefined,
  meals: undefined,
  workouts: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged()
  );

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, value: any) {
    this.subject.next({ ...this.value, [name]: value });
  }
}
