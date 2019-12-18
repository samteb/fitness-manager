import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';

// components
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';

// modules
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';

// store
import { Store } from 'store';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HealthModule
  ],
  providers: [ Store ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
