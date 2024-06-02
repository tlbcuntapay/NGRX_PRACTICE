import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../models/posts.model';
import { Walk } from '../models/walks.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getWalks() {
    return this.http
      .get<Walk[]>(
        `https://localhost:7074/api/Walks`
      )
      .pipe(
        map((data: Walk[]) => {
          return data;
        })
      );
  }

  getPosts() {
    return this.http
      .get<Post[]>(
        `https://ngrxeffects-5c80c-default-rtdb.firebaseio.com/posts.json`
      )
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];

          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://ngrxeffects-5c80c-default-rtdb.firebaseio.com/posts.json`,
      post
    );
  }

  updatePost(post: any) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://ngrxeffects-5c80c-default-rtdb.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://ngrxeffects-5c80c-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
