import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import { Workout } from '../../../../models/workout.model';

@Component({
  selector: 'app-workout-form',
  styleUrls: ['workout-form.component.scss'],
  templateUrl: './workout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent implements OnChanges {
  toggled = false;
  exists = false;
  form = this.fb.group({
    name: ['', Validators.required]
  });

  @Input() workout: Workout;
  @Output() create = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<Workout>();

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.name) {
      this.exists = true;

      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
