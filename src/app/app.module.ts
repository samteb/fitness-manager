import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Store } from 'store';

// routes
import { AppRoutingModule } from './app-routing.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';

// feature modules
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';

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
