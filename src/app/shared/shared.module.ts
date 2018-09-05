import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter-pipe.pipe';
import { ItemComponent } from '../item/item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterPipe, ItemComponent],
  exports: [FilterPipe, ItemComponent]
})
export class SharedModule {}
