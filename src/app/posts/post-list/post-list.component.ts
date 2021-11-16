import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from 'src/app/store/app.state';
import { deletePost, loadPost } from '../state/posts.actions';
import { getPosts } from '../state/posts.selector';
import { Post } from '../state/posts.state';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
postList$!:Observable<Post[]>
  constructor(private store :Store<appState>) {

   }

  ngOnInit() {
    this.store.dispatch(loadPost())
   this.postList$ = this.store.select(getPosts)
  }
  deletePost(id:string|undefined){
    console.log(id);
    id && this.store.dispatch(deletePost({id:id }))
  }
}
