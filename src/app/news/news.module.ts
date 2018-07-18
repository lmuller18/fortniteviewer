import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  declarations: [NewsComponent],
  exports: [NewsComponent]
})
export class NewsModule {}
