import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, HttpClientModule],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule {}
