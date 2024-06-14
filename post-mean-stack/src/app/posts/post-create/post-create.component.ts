import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  enterTitle: string = '';
  enterContent: string = '';

  // turn this event that can listen from the outside, parent component. In this case is the app.component
  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post = {
      title: this.enterTitle,
      content: this.enterContent,
    };
    // emit new event
    this.postCreated.emit(post);
  }
}
