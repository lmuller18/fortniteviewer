import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingComponent } from './upcoming.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: 'upcoming', component: UpcomingComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  declarations: [UpcomingComponent],
  exports: [UpcomingComponent]
})
export class UpcomingModule {}
