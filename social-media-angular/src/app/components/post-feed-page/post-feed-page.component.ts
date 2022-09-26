import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css']
})

export class PostFeedPageComponent implements OnInit {

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  })

  posts: Post[] = [];
  selectedFile: any = null;
  createPost:boolean = false;

  constructor(private postService: PostService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  submitPost = (e: any) => {
    e.preventDefault();
    if (this.postForm.valid) {
      const post:Post = {
        imageUrl: this.postForm.get("imageUrl")?.value || '',
        text: this.postForm.get("text")?.value || '',
        title: this.postForm.get("title")?.value || '',
        user: {
          userId: this.authService.currentUser.userId || 0
        }
      }

      this.postService.createPost(post)
      .subscribe(
        (response) => {
          this.posts = [response, ...this.posts]
          this.toggleCreatePost()
        }
      )
    }else {
      this.postForm.markAllAsTouched();
    }


  }
}
