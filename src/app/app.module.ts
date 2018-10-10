import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule
} from '@angular/material';

import { NewsModule } from './news/news.module';
import { StoreModule } from './store/store.module';
import { ChallengesModule } from './challenges/challenges.module';
import { PlayerModule } from './player/player.module';
import { SearchModule } from './search/search.module';
import { ErrorModule } from './error/error.module';
import { ItemsModule } from './items/items.module';
import { UpcomingModule } from './upcoming/upcoming.module';
import { HomeModule } from './home/home.module';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    ServiceWorkerModule.register('/firebase-messaging-sw.js', {
      enabled: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    NewsModule,
    StoreModule,
    ChallengesModule,
    PlayerModule,
    SearchModule,
    ItemsModule,
    UpcomingModule,
    HomeModule,
    ErrorModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
