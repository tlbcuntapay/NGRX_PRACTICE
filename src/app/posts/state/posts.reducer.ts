import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPost, deletePost, updatePost } from './posts.action';

const _postReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    let updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    }); 

    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state, action) => {
    let updatedPosts = state.posts.filter((post) => {
      return action.id !== post.id;
    }); 

    return {
      ...state,
      posts: updatedPosts,
    };
  }),
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}
