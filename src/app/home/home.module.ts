import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModule } from '../error/error.module';
import { TwitchComponent } from '../twitch/twitch.component';
import { HomeComponent } from './home.component';
import {
  MatProgressSpinnerModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    ErrorModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [HomeComponent, TwitchComponent],
  exports: []
})
export class HomeModule {}
