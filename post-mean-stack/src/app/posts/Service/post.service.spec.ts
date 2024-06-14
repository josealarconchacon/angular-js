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

  describe('getPost', () => {
    it('should return an empty array if no posts have been added', () => {
      expect(service.getPost()).toEqual([]);
    });

    it('should return a copy of the posts array', () => {
      service.addPost('Test Title', 'Test Content');
      const posts = service.getPost();
      expect(posts).toEqual([{ title: 'Test Title', content: 'Test Content' }]);
      expect(posts).not.toBe(service.getPost()); // Ensure a copy is returned, not the original array
    });
  });

  describe('getPostUpdateListener', () => {
    it('should return an observable', () => {
      const postUpdateListener = service.getPostUpdateListener();
      expect(postUpdateListener).toBeInstanceOf(Observable);
    });
  });

  describe('addPost', () => {
    it('should add a new post to the posts array', () => {
      service.addPost('New Title', 'New Content');
      expect(service.getPost()).toEqual([
        { title: 'New Title', content: 'New Content' },
      ]);
    });

    it('should notify subscribers with the updated posts array', (done: DoneFn) => {
      service.getPostUpdateListener().subscribe((posts: Post[]) => {
        expect(posts).toEqual([
          { title: 'Updated Title', content: 'Updated Content' },
        ]);
        done();
      });
      service.addPost('Updated Title', 'Updated Content');
    });
  });
});
