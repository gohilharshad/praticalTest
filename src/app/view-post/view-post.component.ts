import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PostServiceService } from '../post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostServiceService,private router:Router) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log('this.posts: ', this.posts);
    });
  }

  editPost(post: Post) {
    this.router.navigate(['/add-post'], { queryParams: { editMode: true, postId: post.id } });
  }

  deletePost(post: Post) {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      this.postService.deletePost(post.id).subscribe((updatedPosts:any) => {
        this.posts = updatedPosts;
      });
    }
  }

}