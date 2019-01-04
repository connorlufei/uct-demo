import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../+shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
