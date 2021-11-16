import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPostById } from '../state/posts.selector';
import { Post } from '../state/posts.state';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postData$!:Observable<Post | undefined | null>
  constructor( private store: Store<any>) { }

  ngOnInit() {
   this.postData$= this.store.select(getPostById)
  }

}
