import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../model/post.model';
import { PostServiceService } from '../post-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
})
export class PostAddComponent implements OnInit {
  @ViewChild('postForm') postForm!: NgForm;

  newPost: Post = { id: 0, title: '', body: '', tags: [], active: true };
  constructor(
    private postService: PostServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isEdit: any;

  postId: any;
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.isEdit = params.editMode == 'true';
      this.postId = params.postId;

      if (this.isEdit) {
        this.postService.getPost(this.postId).subscribe((post: any) => {
          if (post) {
            this.newPost = post;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.postService.updatePost(this.newPost).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.postService.addPost(this.newPost).subscribe(() => {
        this.router.navigate(['/dashboard']);
        this.postForm.resetForm();
      });
    }
  }
}
