import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
