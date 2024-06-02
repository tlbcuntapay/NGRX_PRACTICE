import { Post } from 'src/app/models/posts.model';
import { Walk } from 'src/app/models/walks.model';

export interface PostsState {
  posts: Post[];
  walks: Walk[];
}

export const initialState: PostsState = {
  posts: [
    // { id: '1', title: 'Sample Title 1', description: 'Sample Description 1' },
    // { id: '2', title: 'Sample Title 2', description: 'Sample Description 2' },
  ],
  walks: []
};
