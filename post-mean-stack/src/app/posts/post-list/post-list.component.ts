import { PostService } from './../Service/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../Model/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSubscription: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.fetchAllPost();
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  fetchAllPost() {
    this.postService.getPost();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        console.log('Fetched posts:', this.posts);
        if (this.posts.length > 0) {
          console.log('First post title:', this.posts[0].title);
        }
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  onDeletePost(postID: string) {
    this.postService.deletePost(postID);
  }
}
