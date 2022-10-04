import { Component, OnInit, Inject, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/post';
import { Follow } from 'src/app/interfaces/follow';
import { FormControl } from '@angular/forms';
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

  // constructor(private authService: AuthService, private dialog: MatDialog) { }
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

  post: Post[] = [];
  follower: Follow[] = [];
  following: Follow[] = [];
  userId: number;
  nowFollowing: Follow;
  postInput: FormControl;
  createPost: Post;

  dialog: MatDialog;

  ngOnInit(): void {
    this.postInput = new FormControl()
    //How are we storing userId? If storing the userId in local storage:
    //this.currentUserId = Number(localStorage.getItem("currentUserId"));
    let userId: number = this.activatedRouter.snapshot.params['userId'];
    console.log("USER PROFILE: ", userId)
    // this.service.setPageUser(userId);
    this.service.GetUser(userId).subscribe(data => {
      this.user = data;
      console.log("Get Request working for user with user ID of:" + data.userId)
    })

    this._postService.getByUserId(userId).subscribe(data => {
      this.post = data;
      console.log("getByUserId working" + data);
    })

    this._followService.TheyAreFollowing(userId).subscribe(data =>{
    this.follower = data;
    console.log("theyAreFollowing method working" + data);

    })

    this._followService.followThemAll(userId).subscribe(data => {
    this.following = data;
    console.log("followThemAll method working")
    })

  }

  followUser() {

    //INCOMPLETE FUNCTION 
    //how we are storing the viewed user
    //routing rules - need the search to test it 

    let name = this.authService.currentUser.firstName; 
    console.log(this.nowFollowing);
    this._followService.IWillFollow(this.nowFollowing).subscribe(data => {
      this.nowFollowing = data;
      console.log("IWillFollow method working");
    alert("You are now following " + name);

    })

  }


  submitPost(){
    this.createPost ={
      text:  this.postInput.value || "",
      title: "",
      imageUrl: "",
      user: {
          userId: this.authService.currentUser.userId||0
    }
  }
    this._postService.postPost(this.createPost).subscribe((res: any)=> {console.log(res)})
    console.log(this.postInput.value)
  

  }

}
