import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  styleUrls: ['schedule-controls.component.scss'],
  templateUrl: './schedule-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input() selected: Date;
  @Output() move = new EventEmitter<number>();

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
