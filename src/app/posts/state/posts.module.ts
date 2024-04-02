import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './posts.reducer';
import { POST_STATE_NAME } from './posts.selector';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      },
      {
        path: 'edit/:id',
        component: EditPostComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    RouterModule.forChild(routes),
  ],
})
export class PostsModule {}
