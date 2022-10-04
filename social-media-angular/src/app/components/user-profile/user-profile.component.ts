import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/post';
import { Follow } from 'src/app/interfaces/follow';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  _authService: AuthService;
  _userService: UserService;
  _router: Router;
  _postService: PostService;
  _followService: FollowService;
  currentUserId: number;  

  constructor(private authService: AuthService, public service: UserService, router: Router,
     public postService: PostService, public followService: FollowService, private cookieService: CookieService, 
     private activatedRouter: ActivatedRoute) {
    this._authService = authService;
    this._userService = service;
    this._router = router;
    this._postService = postService;
    this._followService = followService;
    }

  
  user: User = {
    userId: 0,
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  }

  userBeingViewed: User = {
    userId: 0,
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  }

  currUser: User = {
    userId: 0,
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  }

  posts: Post[] = [];
  follower: Follow[] = [];
  following: Follow[] = [];
  nowFollowing: Follow;
  postInput = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });
  createPost: Post;

  userId: number = this.activatedRouter.snapshot.params['userId'];
  pageUserId = +this.cookieService.get('userId');


  dialog: MatDialog;

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
    this.pageUserId = this.activatedRouter.snapshot.params['userId'];
    // this.service.setPageUser(userId);
    this.service.GetUser(this.pageUserId).subscribe(data => {
      this.user = data;
    })

    this._postService.getByOriginalPost(this.pageUserId).subscribe(data => {
      this.posts = data;
      this.posts.sort((a,b) => {
        return <any>new Date(b.createDateTime!) - <any>new Date(a.createDateTime!)
      })

      this._followService.TheyAreFollowing(this.pageUserId).subscribe(data =>{
        this.follower = data;
      })

      this._followService.followThemAll(this.pageUserId).subscribe(data => {
        this.following = data;
      })
    })
  }

  submitPost(){
    this.createPost ={
      title: this.postInput.value.title || "",
      text:  this.postInput.value.text || "",
      imageUrl: this.postInput.value.imageUrl || "",
      user: {
          userId: +this.cookieService.get('userId')
    }
  }
    this._postService.postPost(this.createPost).subscribe((res: any)=> {console.log(res)})
  }
}
