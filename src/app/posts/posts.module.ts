import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";

import { PostListComponent } from "./post-list/post-list.component";
import { postsEffects } from "./state/posts.effects";
import { postReducer } from "./state/posts.reducer";
import { POSTS_STATE_NAME } from "./state/posts.selector";
const route:Routes=[
  {
    path: '',
    component: PostListComponent,
    children: [{
      path: 'add',component:AddPostComponent
    },
    {
      path: 'edit/:id',component:AddPostComponent
    }]
  },
]
@NgModule({
  declarations: [PostListComponent,AddPostComponent],
  imports: [CommonModule,RouterModule.forChild(route),ReactiveFormsModule,
    FormsModule,StoreModule.forFeature(POSTS_STATE_NAME,postReducer),EffectsModule.forFeature([postsEffects])],
})
export class PostsModule{}
