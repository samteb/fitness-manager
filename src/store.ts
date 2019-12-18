import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, distinctUntilChanged} from 'rxjs/operators';

import { User } from './models/user.model';
import { Meal } from './models/meal.model';

export interface State {
  user: User;
  meals: Meal[];
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

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
