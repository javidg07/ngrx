import { ReturnStatement } from "@angular/compiler"
import { Action, createReducer, on } from "@ngrx/store"
import { addNewPost, addNewPostSuccess, deletePost, deletePostSuccess, editPost, editPostSuccess, loadPostSuccess } from "./posts.actions"
import { initialState, postAdapter } from "./posts.state"

const _postReducer = createReducer(initialState,on(addNewPostSuccess,(state,action)=>{

// let post = {...action.post}
// // post.id = (state?.postList?.length+1).toString();
//   return{
//     ...state,postList:[...state.postList,post]
//   }
   return postAdapter.addOne(action.post,state)

}),on(editPostSuccess,(state,action)=>{
  // let updatedPost =state?.postList?.map(val=>{
  //   return val.id ===action.post.id ? action.post : val;
  // })
  // console.log(updatedPost);

  // return{
  //   ...state,postList:updatedPost
  // }
  return postAdapter.updateOne(action.post,state)

}),on(deletePostSuccess,(state,action)=>{
  // const updatedPost = state?.postList?.filter(val=>{
  //   return val.id !== action.id
  // })
  // return{
  //   ...state,postList:updatedPost
  // }
  return postAdapter.removeOne(action.id,state)
 }),on(loadPostSuccess,(state,action)=>{
  // return{
  //   ...state,postList:action.postList
  // }
  return postAdapter.setAll(action.postList,state)
 }))

export  function postReducer(state:any,action:Action){
  return _postReducer(state,action)
}
