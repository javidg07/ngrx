import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customCounter = createAction('customIncrement',props<{count:number}>())
export const updateName = createAction('updateName',props<{name:string}>())
