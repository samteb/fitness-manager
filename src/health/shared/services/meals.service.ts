import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth.service';
import { Meal } from '../../../models/meal.model';

@Injectable()
export class MealsService {
  mealsRef: AngularFireList<any> = this.db.list(`meals/${this.uid}`);
  meals$: Observable<any[]> = this.mealsRef.snapshotChanges().pipe(
    map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
    tap(next => this.store.set('meals', next))
  );

  constructor(
    private authService: AuthService,
    private store: Store,
    private db: AngularFireDatabase
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getMeal(key: string): Observable<any> {
    if (!key) {
      return of({});
    }

    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map((meals: Meal[]) => meals.find(meal => meal.key === key))
    );
  }

  addMeal(meal: Meal) {
    this.mealsRef.push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    this.mealsRef.remove(key);
  }
}
