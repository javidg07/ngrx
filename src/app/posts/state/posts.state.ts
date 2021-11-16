import { NumberValueAccessor } from "@angular/forms";
import { createEntityAdapter, EntityState } from "@ngrx/entity"

export interface Post{
  id:string ,
  title:string,
  description:string
}

// export interface PostState{
//   postList:Post[];
// }

//  export const initialState:PostState ={
//   postList:[]
// }

export interface PostState extends EntityState<Post>{}

export const postAdapter = createEntityAdapter<Post>();

export const initialState:PostState = postAdapter.getInitialState([]);
