import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Post } from '../Model/post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  enterTitle: string = '';
  enterContent: string = '';

  // event that can listen from the outside, parent component. In this case is the app.component
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    // emit new event
    this.postCreated.emit(post);
  }
}
