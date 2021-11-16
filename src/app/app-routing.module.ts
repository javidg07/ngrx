import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter/counter.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from './services/Auth.Guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'counters',
    loadChildren:()=>import('./counter/counter.module').then(m=>m.CounterModule)
  },
   {
     path:'posts',
     loadChildren:()=>import('./posts/posts.module').then(m=>m.PostsModule),
     canActivate:[AuthGuard]
   },
   {
     path:'posts/details/:id',
     component:PostDetailsComponent
   },
   {
     path:'auth',
     loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
