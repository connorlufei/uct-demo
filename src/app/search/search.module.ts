import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../+shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SearchAreaComponent } from './components/search-area.component';
import { SearchTableComponent } from './components/search-table.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state';

@NgModule({
  declarations: [
    SearchComponent,
    SearchAreaComponent,
    SearchTableComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    ConfirmDialogModule,
    StoreModule.forFeature('search', reducer)
  ]
})
export class SearchModule { }
