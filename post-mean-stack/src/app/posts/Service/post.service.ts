import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Model/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe(
        (postData) => {
          this.posts = postData.posts;
          console.log('Data received from API:', postData);
          this.postUpdated.next([...this.posts]);
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log('Response Data', responseData);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
