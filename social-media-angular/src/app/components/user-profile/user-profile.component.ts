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
import { LocalService } from 'src/app/services/local-storage.service';

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
  _localstorage: LocalService;
  currentUserId: number;  

  constructor(private authService: AuthService, public service: UserService, router: Router,
     public postService: PostService, public followService: FollowService, private cookieService: CookieService, 
     private activatedRouter: ActivatedRoute, private localService: LocalService) {
    this._authService = authService;
    this._userService = service;
    this._router = router;
    this._postService = postService;
    this._followService = followService;
    this._localstorage = localService;
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

  showForm = false;
  userId: number = this.activatedRouter.snapshot.params['userId'];
  pageUserId = +this.cookieService.get('userId');

  dialog: MatDialog;

  ngOnInit(): void {
    this.service.GetUser(this.userId).subscribe(data => {
      this.user = data;
    })

    this.activatedRouter.params.subscribe(params => {
      console.log(params);
      let userId = params['userId']
      if (userId == this.userId){
        this.showForm = true;
      }else {
        this.showForm = false;
      }
      


      this.service.GetUser(userId).subscribe(data => {
        this.user = data;
        let newUserId = data.userId ? data.userId : this.userId;
        this.userId = newUserId;
      })
  
      this._postService.getByOriginalPost(userId).subscribe(data => {
        this.posts = data;
        this.posts.sort((a,b) => {
          return <any>new Date(b.createDateTime!) - <any>new Date(a.createDateTime!)
        })
  
        this._followService.TheyAreFollowing(this.userId).subscribe(data =>{
          this.follower = data;
        })
  
        this._followService.followThemAll(this.userId).subscribe(data => {
          this.following = data;
        })
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
    this._postService.postPost(this.createPost).subscribe((res: any)=> {
      this.posts = [res, ...this.posts]
    })
  }
}
