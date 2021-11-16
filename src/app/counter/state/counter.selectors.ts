import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";
export const COUNTER_STATE_NAME ='counter';
const feature = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);

export const getCounter = createSelector(feature,(state)=>{
  return state.counter;
})

export const getName = createSelector(feature,state=>{
return state.name;
})
