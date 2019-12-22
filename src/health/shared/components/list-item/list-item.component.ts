import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '../../../../models/meal.model';

@Component({
  selector: 'app-list-item',
  styleUrls: ['list-item.component.scss'],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() item: Meal;
  @Output() remove = new EventEmitter<any>();

  toggled = false;

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [ '../meals', item.key ];
  }
}
