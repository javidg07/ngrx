import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.state"

export const AUTH_STATE_NAME = 'auth'

 const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

 export const getUserAuthDetails = createSelector(getAuthState,(state)=>{
   return state.user ? true : false;
  })

   export const getAuthToken = createSelector(getAuthState,state=>{
     return state.user ? state.user?.token : null
   })

