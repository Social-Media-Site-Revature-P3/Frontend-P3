import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/interfaces/user';
import { Like } from '../../interfaces/like'
import {LikesService } from '../../services/likes.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  foundIt: String = "false"
  likePost : boolean = false
  dislikePost : boolean = false
  @Input('postId') postId : number 

  constructor(private authService: AuthService, private likesService: LikesService, private postService: PostService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.foundIt= "false"
    this.getLikes()
    if(this.foundIt!="false"){
    if(this.foundIt=="like"){
      this.toggleLikeComment()
    }else{this.toggleDislikeComment()}}
  }

  newLike: Like = {
    liked: true,
    post: {
      postId: 0
    },
    user:{
      userId: +this.cookieService.get('userId')
    }
  }

  likes: Like[] = [{
    liked: true,
    post:{
      postId: 0
    },
    user: {
      userId:  +this.cookieService.get('userId')
  }
  }]

  dislikes: Like[] = [{
    liked: false,
    post:{
      postId: 0
    },
    user: {
      userId:  +this.cookieService.get('userId')
  }
  }]

  toggleLikeComment  ()  {
    if(this.dislikePost) {
      this.toggleDislikeComment()
    }
    this.likePost = !this.likePost
    console.log("DEBUG-LIKE", this.likePost)
  }

  toggleDislikeComment  ()  {
    if(this.likePost) {
      this.toggleLikeComment()
    }
    this.dislikePost = !this.dislikePost
    console.log("DEBUG-DISLIKE", this.likePost)
  }

  getLikes=()=>{
    this.likesService.GetByPostId(this.postId).subscribe((allLikesAndDislikes: Array<Like[]>)=>{
      let allLikes = allLikesAndDislikes.slice(0, 1);
      let allDislikes = allLikesAndDislikes.slice(1);
      for(let likes of allLikes) {
        this.likes = likes;
        for(let like of likes) {
          if(like.user.userId == this.newLike.user.userId) {
            console.log("getlikes line 81, the like object should have an ID: ", like);
            this.newLike = like
            this.foundIt="like"
            // this.toggleLikeComment()
          }
        }
      }
      for(let dislikes of allDislikes){
        for(let dislike of dislikes) {
          if(dislike.user.userId == this.newLike.user.userId) {
            this.newLike = dislike
            this.foundIt="dislike"
            // this.toggleDislikeComment()
          }
        }
        this.dislikes = dislikes;
      }
    })
  }
  
//this.postService.currentPost.postId || 0
  submitLike = (e : any) => {
    if( this.likePost==false) {
      console.log("likepost is false line 101")
      this.newLike.liked = true;
      this.newLike.post.postId = this.postId || 0
      this.newLike.user.userId = + this.cookieService.get('userId')
      this.likesService.CreateLike(this.newLike)
      .subscribe(
        (response) => {
          console.log("value emitted line 108")
          this.newLike = response
          //this.likesService.CreateLike(this.newLike).subscribe((response)=> {this.getLikes()})
          this.getLikes()
          this.toggleLikeComment()
        }
      )
    } else if(this.likePost==true) {
      console.log("likepost is true line 116")
      this.deleteLike()
    }
  }

  submitDislike = (e : any) => {
    if(this.dislikePost ==false) {
      this.newLike.liked = false;
      this.newLike.post.postId = this.postId || 0
      this.newLike.user.userId = + this.cookieService.get('userId')
      this.likesService.CreateLike(this.newLike)
      .subscribe(
        (response) => {
          this.newLike = response
          // this.likesService.CreateLike(this.newLike).subscribe((response)=> {this.getLikes()})\
          this.getLikes()
          this.toggleDislikeComment()
        }
      )
    } else if(this.dislikePost==true) {
      this.deleteLike()
    }
  }

  deleteLike() {
    console.log("deleting like... This should be populated with the matching like ID: ", this.newLike.likeId, this.newLike);
    this.likesService.DeleteLike(this.newLike.likeId || 0).subscribe(() => {
      if(this.likePost == true) {
        this.toggleLikeComment()
      } else {
        if (this.dislikePost) {
          this.toggleDislikeComment()
        }
      }
    })
  }
}
