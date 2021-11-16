import { Action, createReducer, on } from "@ngrx/store";
import { errorHandle } from "./shared.action";
import { initialState, SharedState } from "./shared.state";

const _sharedReducer = createReducer(initialState,on(errorHandle,(state,action)=>{
  return {
    ...state, errorMessage: action.message
  }

}))

export function sharedReducer(state:any,action:Action){
  return _sharedReducer(state,action);
}
