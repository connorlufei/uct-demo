import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../+shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SearchAreaComponent } from './components/search-area.component';
import { SearchTableComponent } from './components/search-table.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchAreaComponent,
    SearchTableComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    ConfirmDialogModule
  ]
})
export class SearchModule { }
