import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [{ path: 'store', component: StoreComponent }];
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
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  declarations: [StoreComponent],
  exports: [StoreComponent]
})
export class StoreModule {}
