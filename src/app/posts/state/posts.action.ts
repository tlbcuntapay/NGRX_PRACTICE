import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { Walk } from 'src/app/models/walks.model';

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCESS = '[posts page] delete post success';
export const LOAD_POST = '[posts page] load post';
export const LOAD_POST_SUCCESS = '[posts page] load post success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post}>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: Post }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCESS, props<{ id: string }>());
export const loadPosts = createAction(LOAD_POST);
export const loadPostsSuccess = createAction(LOAD_POST_SUCCESS, props<{ posts: Post[] }>());



export const getWalks = createAction("[post page] get walks");
export const getWalksSuccess = createAction("[post page] get walks success", props<{ walks: Walk[]}>());
export const getWalksFailure = createAction("[post page] get walks fail");