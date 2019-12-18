import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { User } from '../../../models/user.model';
import { Store } from 'store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  async onLogout(): Promise<boolean> {
    await this.authService.logoutUser();
    return this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
