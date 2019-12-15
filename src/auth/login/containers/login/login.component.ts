import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  constructor() {}

  loginUser(event: FormGroup): void {
    console.log(event.value);
  }
}
