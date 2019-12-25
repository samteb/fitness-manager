import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Schedule } from '../../../../models/schedule.model';

@Component({
  selector: 'app-schedule-section',
  styleUrls: ['schedule-section.component.scss'],
  templateUrl: './schedule-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent {
  @Input() name: string;
  @Input() section: Schedule;
  @Output() select = new EventEmitter<any>();

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;

    this.select.emit({
      type,
      assigned,
      data
    });
  }
}
