import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from 'store';

import { AuthService } from '../../../auth/shared/services/auth.service';

@Injectable()
export class MealsService {
  meals$: Observable<any[]> = this.db.list(`meals/${this.uid}`).valueChanges().pipe(
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
}
