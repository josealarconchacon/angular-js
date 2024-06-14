import { Component } from '@angular/core';
import { Post } from './posts/Model/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'post-mean-stack';
  storedPosts: Post[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
