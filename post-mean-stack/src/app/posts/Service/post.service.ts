import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Model/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: any[] }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          console.log('Raw API response:', postData); // Log the entire API response

          return postData.posts.map((post) => {
            console.log('Processing post:', post); // Log each individual post object

            // Ensure properties are defined before accessing
            return {
              title: post.title || '', // Handle undefined or null title
              content: post.content || '', // Handle undefined or null content
              id: post._id || '', // Handle undefined or null _id
            };
          });
        })
      )
      .subscribe(
        (postResponsiveData) => {
          this.posts = postResponsiveData;
          console.log('Data received from API:', postResponsiveData);
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

  getPostByID(id: string) {
    return { ...this.posts.find((post) => post.id === id) };
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

  deletePost(postID: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postID)
      .subscribe(() => {
        console.log('Deleted');
        const updatedPost = this.posts.filter((post) => post.id !== postID);
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
      });
  }
}
