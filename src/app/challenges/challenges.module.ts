import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatListModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export const ROUTES: Routes = [
  { path: 'challenges', component: ChallengesComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatListModule,
    HttpClientModule
  ],
  declarations: [ChallengesComponent],
  exports: [ChallengesComponent]
})
export class ChallengesModule {}
