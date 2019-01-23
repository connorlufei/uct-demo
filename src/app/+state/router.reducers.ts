import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer, RouterNavigationAction, RouterReducerState } from '@ngrx/router-store';

export interface RouterStateUrl  {
  url: string;
  urlParts: string[];
  params: Params;
  queryParams: Params;
}

export type RouterAction = RouterNavigationAction<RouterStateUrl>;
export type RouterState = RouterReducerState<RouterStateUrl>;

export { routerReducer } from '@ngrx/router-store';

export class CustomRouteSerializer implements RouterStateSerializer<RouterStateUrl > {

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url, root: { queryParams }} = routerState;

    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params } = route;

    // split url string into string arrays separated by '/'
    const urlParts = url.substr(1).split('/');

    return { url, urlParts, params, queryParams };
  }
}
