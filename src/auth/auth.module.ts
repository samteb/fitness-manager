import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { SharedModule } from './shared/shared.module';

const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyCjccpzt2b4BL0jSnDNrgGQyDlDpvZB-uQ',
  authDomain: 'fitness-manager-6a6f4.firebaseapp.com',
  databaseURL: 'https://fitness-manager-6a6f4.firebaseio.com',
  projectId: 'fitness-manager-6a6f4',
  storageBucket: 'fitness-manager-6a6f4.appspot.com',
  messagingSenderId: '832256687093',
  appId: '1:832256687093:web:663804c24efdc341a17ebc'
};

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
