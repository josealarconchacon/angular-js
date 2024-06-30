import { PostService } from './../Service/post.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../Model/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  enterTitle: string = '';
  enterContent: string = '';
  private mode = 'create';
  private postID: string;
  post: Post;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPostIdParams();
  }

  getPostIdParams() {
    return this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postId');
        this.post = this.postService.getPostByID(this.postID);
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
