import { PostService } from './../Service/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../Model/post.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isPostLoading: boolean = false;
  totalPosts: number = 0;
  postPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions: number[] = [1, 2, 5, 10];
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

  onChangePage(pageData: PageEvent) {
    console.log('Page event:', pageData);
    this.isPostLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPost(this.postPerPage, this.currentPage);
  }

  onDeletePost(postID: string) {
    this.deletingPost(postID);
  }

  fetchAllPost() {
    this.isPostLoading = true;
    this.postService.getPost(this.postPerPage, 1);
    this.postSubscription = this.postService.getPostUpdateListener().subscribe(
      (postsData: { posts: Post[]; postCount: number }) => {
        this.isPostLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;
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
  deletingPost(postID: string) {
    this.postService.deletePost(postID).subscribe(() => {
      this.postService.getPost(this.postPerPage, this.currentPage);
    });
  }
}
