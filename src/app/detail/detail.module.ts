import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { SharedModule } from '../+shared/shared.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    SharedModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
