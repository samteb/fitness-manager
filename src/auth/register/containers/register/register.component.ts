import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registerUser(event: FormGroup): Promise<boolean> {
    try {
      const { email, password } = event.value;
      await this.authService.createUser(email, password);
      return  this.router.navigate(['/']);
    } catch (error) {
      this.error = error.message;
    }
  }
}
