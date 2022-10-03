import { Component, OnInit } from '@angular/core';
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

  likePost: boolean = false

  constructor(private authService: AuthService, private likesService: LikesService, private postService: PostService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getLikes()
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
    liked: true,
    post:{
      postId: 0
    },
    user: {
      userId:  +this.cookieService.get('userId')
  }
  }]

  toggleLikeComment = () => {
    this.likePost = true
  }

  getLikes=()=>{
    this.likesService.GetByPostId(8).subscribe((allLikesAndDislikes: Array<Like[]>)=>{
      let allLikes = allLikesAndDislikes.slice(0, 1);
      let allDislikes = allLikesAndDislikes.slice(1);
      for(let likes of allLikes) {
        this.likes = likes;
      }
      for(let dislikes of allDislikes){
        this.dislikes = dislikes;
      }
    })
  }
  
//this.postService.currentPost.postId || 0
  submitLike =(e:any) => {
    this.newLike.liked = true;
    this.newLike.post.postId = this.postService.currentPost.postId || 0
    this.newLike.user.userId = + this.cookieService.get('userId')
    this.likesService.CreateLike(this.newLike)
    .subscribe(
      (response) => {
        this.newLike = response
        this.likesService.CreateLike(this.newLike).subscribe((response)=> {this.getLikes()})
        this.toggleLikeComment()
      }
    )
  }
}
