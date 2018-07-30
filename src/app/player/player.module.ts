import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatGridListModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModule } from '../error/error.module';
import { CamelCasePipe } from '../camel-case.pipe';

export const ROUTES: Routes = [
  { path: 'player/:platform/:username', component: PlayerComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    ErrorModule,
    HttpClientModule
  ],
  declarations: [PlayerComponent, CamelCasePipe],
  exports: [PlayerComponent]
})
export class PlayerModule {}
