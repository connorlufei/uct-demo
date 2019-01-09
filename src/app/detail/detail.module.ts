import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { SharedModule } from '../+shared/shared.module';
import { DetailActionComponent } from './components/detail-action.component';
import { DetailFormComponent } from './components/detail-form.component';

@NgModule({
  declarations: [DetailComponent, DetailActionComponent, DetailFormComponent],
  imports: [
    SharedModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
