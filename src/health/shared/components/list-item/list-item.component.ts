import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '../../../../models/meal.model';
import { Workout } from '../../../../models/workout.model';

@Component({
  selector: 'app-list-item',
  styleUrls: ['list-item.component.scss'],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() item: any;
  @Output() remove = new EventEmitter<any>();

  toggled = false;

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [
      `../${ item.ingredients ? 'meals' : 'workouts' }`,
      item.key
    ];
  }
}
