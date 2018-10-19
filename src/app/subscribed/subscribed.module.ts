import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribedComponent } from './subscribed.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: 'subscribed', component: SubscribedComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,

    HttpClientModule,
    SharedModule
  ],
  declarations: [SubscribedComponent]
})
export class SubscribedModule {}
