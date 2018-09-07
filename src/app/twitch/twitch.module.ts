import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModule } from '../error/error.module';
import { TwitchComponent } from './twitch.component';
import {
  MatProgressSpinnerModule,
  MatGridListModule,
  MatCardModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [{ path: 'twitch', component: TwitchComponent }];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    ErrorModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [TwitchComponent],
  exports: []
})
export class TwitchModule {}
