import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  styleUrls: ['schedule-days.component.scss'],
  templateUrl: './schedule-days.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {
  @Input() selected: number;
  @Output() select = new EventEmitter<number>();

  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  selectDay(index: number) {
    this.select.emit(index);
  }
}
