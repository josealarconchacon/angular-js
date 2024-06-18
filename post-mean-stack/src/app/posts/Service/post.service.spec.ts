import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { Post } from '../Model/post.model';
import { Observable } from 'rxjs';

fdescribe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPostUpdateListener', () => {
    it('should return an observable', () => {
      const postUpdateListener = service.getPostUpdateListener();
      expect(postUpdateListener).toBeInstanceOf(Observable);
    });
  });
});
