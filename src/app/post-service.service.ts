import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../app/model/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private   localStorageKey = 'posts';

  constructor() {}

  getPosts(): Observable<Post[]> {
    const postsString = localStorage.getItem(this.localStorageKey);
    const posts: Post[] = postsString ? JSON.parse(postsString) : [];
    return of(posts);
  }

  addPost(newPost: Post): Observable<Post[]> {
    const postsString = localStorage.getItem(this.localStorageKey);
    let posts: Post[] = postsString ? JSON.parse(postsString) : [];

    newPost.id = this.getNextId(posts);

    posts.push(newPost);
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts));

    console.log('Posts after adding:', posts); 

    return of(posts);
  }
  private getNextId(posts: Post[]): number {
    const maxId = Math.max(...posts.map(post => post.id), 0);
    return maxId + 1;
  }

  deletePost(postId: number): Observable<Post[]> {
    let posts: Post[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
    return of(posts);
  }

  editPost(updatedPost: Post): Observable<Post[]> {
    const postsString = localStorage.getItem(this.localStorageKey);
    let posts: Post[] = postsString ? JSON.parse(postsString) : [];

    const index = posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = updatedPost;
      localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
    }

    return of(posts);
  }

  getPost(postId: number): Observable<Post | undefined> {
    console.log('postId: ', postId);
    const postsString = localStorage.getItem(this.localStorageKey);
    console.log(postsString);
    
    const posts: Post[] = postsString ? JSON.parse(postsString) : [];
    console.log(">>>>>>",posts);
    let data: Post | undefined;
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      if(element.id == postId) {
        data = element;
        break
      }
    }
    return of(data);
  }

  updatePost(post: Post): Observable<Post | undefined> {
    const postsString = localStorage.getItem(this.localStorageKey);
    let posts: Post[] = postsString ? JSON.parse(postsString) : [];

    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = { ...post };
      localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
      return of(post);
    } else {
      console.error(`Post with id ${post.id} not found`);
      return of(undefined); 
    }
  }
  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem('isLoggedIn');
  }

}