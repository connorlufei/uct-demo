import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    TableModule,
    MessagesModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ]
})
export class SharedModule { }
