import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '../../../auth/shared/services/auth.service';
import { Schedule, ScheduleItem } from '../../../models/schedule.model';

import { Store } from 'store';

@Injectable()
export class ScheduleService {
  private scheduleRef: AngularFireList<any> = this.db.list(`schedule/${this.uid}`);
  private dateSource$ = new BehaviorSubject(new Date());
  private sectionSource$ = new Subject();
  private itemsSource$ = new Subject();

  items$ = this.itemsSource$.pipe(
    withLatestFrom(this.sectionSource$),
    map(([ items, section ]: any[]) => {
      const id = section.data.key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const schedule = {
        ...(id ? section.data : defaults),
        ...items
      };

      return id ? this.updateSchedule(id, schedule) : this.addSchedule(schedule);
    })
  );

  selected$: Observable<any> = this.sectionSource$.pipe(
    tap((next: any) => this.store.set('selected', next))
  );

  list$: Observable<any> = this.sectionSource$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  );

  schedule$: Observable<any[]> = this.dateSource$.pipe(
    tap((next: any) => this.store.set('date', next)),
    map((day: any) => {
      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      const mapped: Schedule = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next))
  );

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  setDate(date: Date) {
    this.dateSource$.next(date);
  }

  setSection(data: any) {
    this.sectionSource$.next(data);
  }

  setItems(items: string[]) {
    this.itemsSource$.next(items);
  }

  private getSchedule(startAt: number, endAt: number) {
    const query = ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
    return this.db.list(`schedule/${this.uid}`, query).valueChanges();
  }

  private addSchedule(schedule: ScheduleItem) {
    return this.scheduleRef.push(schedule);
  }

  private updateSchedule(key: string, schedule: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(schedule);
  }
}
