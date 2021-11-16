import { createAction, props } from "@ngrx/store"

export const SET_ERROR_MESSAGE = '[SHARED STATE] SET ERROR'
export const errorHandle = createAction(SET_ERROR_MESSAGE,props<{message:string}>())
