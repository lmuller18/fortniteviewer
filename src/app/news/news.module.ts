import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [{ path: 'news', component: NewsComponent }];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [NewsComponent],
  exports: [NewsComponent]
})
export class NewsModule {}
