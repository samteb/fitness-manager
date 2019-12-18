import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async loginUser(event: FormGroup): Promise<boolean> {
    try {
      const { email, password } = event.value;
      await this.authService.loginUser(email, password);
      return this.router.navigate(['/']);
    } catch (error) {
      this.error = error.message;
    }
  }
}
