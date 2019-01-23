import { NgModule, SkipSelf, Optional } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { reducers, effects } from './+state';
import { EffectsModule } from '@ngrx/effects';
import { CustomRouteSerializer } from './+state/router.reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: CustomRouteSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class AppStoreModule {
  constructor(@SkipSelf() @Optional() parentModule: AppStoreModule) {
    if (parentModule) {
      throw new Error('AppStoreNodule is already loaded. Import it in the AppModule only');
    }
  }
}
