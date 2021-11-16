import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createEffects } from '@ngrx/effects/src/effects_module';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { errorHandle } from 'src/app/store/shared/shared.action';
import {
  addNewPost,
  addNewPostSuccess,
  deletePost,
  deletePostSuccess,
  editPost,
  editPostSuccess,
  loadPost,
  loadPostSuccess,
} from './posts.actions';
import {
  RouterNavigatedAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { Update } from '@ngrx/entity';
import { Post, postAdapter } from './posts.state';
import { Store } from '@ngrx/store';
import { getPosts } from './posts.selector';
@Injectable({
  providedIn: 'root',
})
export class postsEffects {
  constructor(
    private actions$: Actions,
    private postService: PostsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private store :Store<any>

  ) {}

  loadPosts$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loadPost),
      withLatestFrom(this.store.select(getPosts)),
      exhaustMap(([action,posts]):any => {
        this.spinner.show();
        if(posts.length <= 1){
        return this.postService.getPost().pipe(
          map((postList) => {
            this.spinner.hide();
            return loadPostSuccess({ postList });
          }),
          catchError((err) => {
            this.spinner.hide();
            console.log(err);

            const errorMessage = this.postService.getErrorMessage(
              err.error.error.message
            );
            return of(errorHandle({ message: errorMessage }));
          })
        );
        }
        this.spinner.hide();
        return EMPTY;
      })
    );
  });

  addPost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(addNewPost),
      exhaustMap((action) => {
        this.spinner.show();
        return this.postService.addPost(action.post).pipe(
          map((val) => {
            const post = { ...action.post, id: val.name };
            this.spinner.hide();
            return addNewPostSuccess({ post, redirect: true });
          }),
          catchError((err) => {
            this.spinner.hide();
            console.log(err);

            const errorMessage = this.postService.getErrorMessage(
              err.error.error.message
            );
            return of(errorHandle({ message: errorMessage }));
          })
        );
      })
    );
  });

  updatePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(editPost),
      exhaustMap((action) => {
        this.spinner.show();
        return this.postService.updatePost(action.post).pipe(
          map((val) => {
            console.log(val);
              const updatedPost:Update<Post> = {
                id:action && action?.post?.id ,
                changes:{  ...action.post  }
            }
            this.spinner.hide();
            // return editPostSuccess({ post: action.post, redirect: true });
             return editPostSuccess({ post: updatedPost, redirect: true });

          }),
          catchError((err) => {
            this.spinner.hide();
            console.log(err);

            const errorMessage = this.postService.getErrorMessage(
              err.error.error.message
            );
            return of(errorHandle({ message: errorMessage }));
          })
        );
      })
    );
  });
  deletePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((action) => {
        return this.postService.deletePost(action.id).pipe(
          map((post) => {
            console.log(post);
            return deletePostSuccess({ id: action.id });
          }),
          catchError((err) => {
            console.log(err);

            const errorMessage = this.postService.getErrorMessage(
              err.error.error.message
            );
            return of(errorHandle({ message: errorMessage }));
          })
        );
      })
    );
  });

  redirectToPost$ = createEffect(
    (): any => {
      return this.actions$.pipe(
        ofType(...[editPostSuccess, addNewPostSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/posts']);
          }
        })
      );
    },
    { dispatch: false }
  );
  singlePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        const state =  r.payload.routerState
         console.log(state.url.split('/')[3]);
        return state.url.split('/')[3];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id,posts]):any => {
        if(posts?.length < 1){
        return this.postService.getSinglePost(id).pipe(
          map((post) => {
            const postData = [{ ...post, id }];
            return loadPostSuccess({ postList: postData });
          })
        );
      }
      // we need to return an empty observable to prevent the effect from running into error
      // we can also create an  dummy effect but tis is ez
      this.spinner.hide();
      return EMPTY
      })
    );
  });
}
