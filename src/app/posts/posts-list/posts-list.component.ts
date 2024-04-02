import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from '../state/posts.selector';
import { deletePost } from '../state/posts.action';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.posts = this.store.select(getPosts);
  }

  onDeletePost(id: any) {
    if (confirm("Are you sure you want to delete this post")) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
