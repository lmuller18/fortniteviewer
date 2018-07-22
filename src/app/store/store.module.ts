import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export const ROUTES: Routes = [{ path: 'store', component: StoreComponent }];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  declarations: [StoreComponent],
  exports: [StoreComponent]
})
export class StoreModule {}
