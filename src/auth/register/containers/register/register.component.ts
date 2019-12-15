import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  constructor() {}

  registerUser(event: FormGroup): void {
    console.log(event.value);
  }
}
