import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

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

  addMeal(meal: Meal) {
    this.mealsRef.push(meal);
  }

  removeMeal(key: string) {
    this.mealsRef.remove(key);
  }
}
