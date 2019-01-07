import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../+shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    SearchRoutingModule,
    BrowserAnimationsModule,
    ConfirmDialogModule
  ]
})
export class SearchModule { }
