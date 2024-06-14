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
    this.postSubscription.unsubscribe();
  }

  fetchAllPost() {
    this.posts = this.postService.getPost();
    this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
