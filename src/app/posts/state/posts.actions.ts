import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Post } from "./posts.state";

const addPost = '[post page ] add post';
const ADD_POST_SUCCESS = '[post page ] add post success';

const editPostData = '[post page ] edit post'
const EDIT_POST_SUCCESS = '[post page ] edit post success'
const deletePostData = '[post page ] delete post'
const DELETE_POST_SUCCESS = '[post page ] delete post success'

const  LOAD_POST = '[post page ] load post'
const  LOAD_POST_SUCCESS = '[post page ] load post success'

export const addNewPost = createAction(addPost,props<{post:Post}>())
export const addNewPostSuccess = createAction(ADD_POST_SUCCESS,props<{post:Post,redirect:boolean}>())

export const editPost = createAction(editPostData,props<{post:Post}>())

// export const editPostSuccess = createAction(EDIT_POST_SUCCESS,props<{post:Post,redirect:boolean}>())
//only for update using  ngrx entity we need to send Update<Post> !!! important
 export const editPostSuccess = createAction(EDIT_POST_SUCCESS,props<{post:Update<Post>,redirect:boolean}>())

export const deletePost = createAction(deletePostData,props<{id:string}>())
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS,props<{id:string}>())

export  const loadPost = createAction(LOAD_POST)
export const loadPostSuccess = createAction(LOAD_POST_SUCCESS,props<{postList:Post[]}>())
