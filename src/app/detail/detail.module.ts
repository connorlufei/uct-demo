import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { SharedModule } from '../+shared/shared.module';
import { DetailActionComponent } from './components/detail-action.component';
import { DetailFormComponent } from './components/detail-form.component';
import { StoreModule } from '@ngrx/store';
import { reducer, effects } from './+state';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [DetailComponent, DetailActionComponent, DetailFormComponent],
  imports: [
    SharedModule,
    DetailRoutingModule,
    StoreModule.forFeature('detail', reducer),
    EffectsModule.forFeature(effects)
  ]
})
export class DetailModule { }
