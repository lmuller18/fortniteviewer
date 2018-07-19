import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [{ path: 'store', component: StoreComponent }];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [StoreComponent],
  exports: [StoreComponent]
})
export class StoreModule {}
