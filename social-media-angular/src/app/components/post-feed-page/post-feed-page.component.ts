
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Follow } from 'src/app/interfaces/follow';
import {Post} from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
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

  userId: number = 0;
  posts: Post[] = [];
  selectedFile: any = null;
  createPost:boolean = false;

  constructor(private postService: PostService, private authService: AuthService, private cookieService: CookieService, private followService: FollowService) {
  }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId');
    this.followService.TheyAreFollowing(this.userId).subscribe((follows: Follow[]) => {
      for(let follow of follows){
        console.log(follow.followedUser.userId)
        this.postService.getByOriginalPost(follow.followedUser.userId).subscribe(response =>{
          this.posts = this.posts.concat(response)
          console.log(this.posts)
          this.posts.sort((a,b) => {
            return <any>new Date(b.createDateTime!) - <any>new Date(a.createDateTime!)
          })
        })
      }
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  post: Post={
    text:  "",
    title: "",
    imageUrl: "",
    comment: true,
    user: {
        userId: this.userId
    }
  }
  
  submitPost = (e: any) => {
    e.preventDefault();
    this.post.text =this.postForm.value.text || ""
    this.post.imageUrl =  this.postForm.value.imageUrl || ""
    this.post.comment = false
    this.post.user.userId =  this.userId||0
    this.postService.postPost(this.post)
      .subscribe(
        (response) => {
          this.posts = [response, ...this.posts]
          this.toggleCreatePost()
        }
      )
  }
}