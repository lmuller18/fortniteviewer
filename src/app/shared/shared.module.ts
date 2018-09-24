import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter-pipe.pipe';
import { ItemComponent } from '../item/item.component';
import { MatIconModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule, MatSnackBarModule],
  declarations: [FilterPipe, ItemComponent],
  exports: [FilterPipe, ItemComponent]
})
export class SharedModule {}
