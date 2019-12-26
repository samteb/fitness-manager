import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Meal } from '../../../../models/meal.model';
import { Workout } from '../../../../models/workout.model';

@Component({
  selector: 'app-schedule-assign',
  styleUrls: ['schedule-assign.component.scss'],
  templateUrl: './schedule-assign.component.html'
})
export class ScheduleAssignComponent implements OnInit {
  private selected: string[] = [];

  @Input() section: any;
  @Input() list: Meal[] | Workout[];
  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [ ...this.section.assigned ];
  }

  getRoute(name: string) {
    return [ `../${name}/new` ];
  }

  isSelected(name: string) {
    return this.selected.indexOf(name) !== -1;
  }

  selectItem(name: string) {
    if (this.isSelected(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [ ...this.selected, name ];
    }
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}

