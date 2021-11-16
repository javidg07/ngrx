import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { customCounter, decrement, increment, reset, updateName } from './counter.action';
import { initialState } from './counter.state';
const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),on(customCounter,(state,{count})=>{
    return{
      ...state,counter:state.counter + count
    }
  }),on(updateName,(state,{name})=>{
    return{
      ...state,name:name
    }
  })
);

export function counterReducer(state: any, action: Action) {
  return _counterReducer(state, action);
}
