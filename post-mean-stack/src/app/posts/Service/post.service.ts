import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Model/post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any[]; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          console.log('Raw API response:', postData); // Log the entire API response

          return {
            posts: postData.posts.map((post) => {
              console.log('Processing post:', post); // Log each individual post object

              // Ensure properties are defined before accessing
              return {
                title: post.title || '', // Handle undefined or null title
                content: post.content || '', // Handle undefined or null content
                id: post._id || '', // Handle undefined or null _id
                imagePath: post.imagePath || '', // Handle undefined or null imagePath
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe(
        (postResponsiveData) => {
          this.posts = postResponsiveData.posts;
          console.log('Data received from API:', postResponsiveData);
          this.postUpdated.next({
            posts: [...this.posts],
            postCount: postResponsiveData.maxPosts,
          });
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
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image: File) {
    const postDataOj = new FormData();
    postDataOj.append('title', title);
    postDataOj.append('content', content);
    postDataOj.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postDataOj
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postID: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postID);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
      };
      this.http
        .put('http://localhost:3000/api/posts/' + id, postData)
        .subscribe((response) => {
          this.router.navigate(['/']);
        });
    }
  }
}
