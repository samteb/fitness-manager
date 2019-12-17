import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppComponent } from './containers/app/app.component';
import { AuthModule } from '../auth/auth.module';
import { Store } from 'store';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    Store
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
