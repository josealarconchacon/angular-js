import { PostService } from './../Service/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../Model/post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  enterTitle: string = '';
  enterContent: string = '';
  post: Post;
  isPostLoading: boolean = false;
  form: FormGroup;
  imagePreview: string | null = null;
  private mode = 'create';
  private postID: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setFormGroup();
    this.getPostIdParams();
  }

  setFormGroup() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  getPostIdParams() {
    return this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postId');
        this.isPostLoading = true;
        this.postService.getPostByID(this.postID).subscribe((postData) => {
          this.isPostLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const selectFile = input.files[0];
      this.form.patchValue({ image: selectFile });
      this.form.get('image').updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          this.imagePreview = fileReader.result;
        }
      };
      fileReader.readAsDataURL(selectFile);
    }
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isPostLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postID,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
