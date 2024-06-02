import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from 'src/app/services/post.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  getWalks,
  getWalksFailure,
  getWalksSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Walk } from 'src/app/models/walks.model';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadWalks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getWalks),
      mergeMap((action) => {
        return this.postsService.getWalks().pipe(
          map((walks: Walk[]) => {
            return getWalksSuccess({ walks });
          }),
          catchError((error) => {
            return of(getWalksFailure()); // Handle errors
          })
        );
      })
    );
  });

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      mergeMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
