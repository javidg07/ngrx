

import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authReducer } from "../auth/state/auth.reducers";
import { AUTH_STATE_NAME } from "../auth/state/auth.selectors";
import { AuthState } from "../auth/state/auth.state";
import { ROUTER_STATE_NAME } from "./router/router.selector";
import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface appState{
  [AUTH_STATE_NAME]: AuthState;
 [SHARED_STATE_NAME]:SharedState,
 [ROUTER_STATE_NAME]:RouterReducerState
}

export const appReducer={
  [SHARED_STATE_NAME]:sharedReducer,
  [AUTH_STATE_NAME]:authReducer,
  [ROUTER_STATE_NAME]:routerReducer

}
