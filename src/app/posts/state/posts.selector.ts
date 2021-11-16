import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom.serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { Post, postAdapter, PostState } from "./posts.state";
export const POSTS_STATE_NAME ='posts'
const feature = createFeatureSelector<PostState>(POSTS_STATE_NAME);

// export const getPosts = createSelector(feature,(state)=>{
//   return state.postList;
// });
// export const getPostById = createSelector(feature,getCurrentRoute,(posts,route:RouterStateUrl)=>{
//   return posts && posts.postList.find((val)=> val.id === route.params['id'])
// })

export const getPostSelectors = postAdapter.getSelectors()

export const getPosts = createSelector(feature,getPostSelectors.selectAll);

export const getPostsId = createSelector(feature,getPostSelectors.selectEntities);

  export const getPostById:any= createSelector(getPostsId,getCurrentRoute,(posts,route:RouterStateUrl)=>{
  return posts ? posts[route.params['id']] : null ;
})

