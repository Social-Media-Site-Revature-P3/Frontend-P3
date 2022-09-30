import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Follow } from 'src/app/interfaces/follow';
import {Post} from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { Comment } from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { Bookmark } from 'src/app/interfaces/bookmark';
import { BookmarkService } from 'src/app/services/bookmark.service';
import {UserService} from "../../services/user.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post | any;
  replyToPost: boolean = false;
  comments: Post[] = [];
  user: User 
  constructor(private postService: PostService,
              private authService: AuthService,
              private userService: UserService,
              private followService: FollowService,
              private bookMarkService: BookmarkService,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    this.userService.GetUser(this.post.user.userId).subscribe({
      next: user => {
        this.post.user = user;
      }
    })

    this.postService.getByComments(this.post.postId).subscribe({
      next: data => this.comments = data
    })

    this.getComments()
  }

  newPost: Post = {
    text:  "",
    title: "",
    imageUrl: "",
    comment: true,
    createDateTime: "",
    user: {
        userId:  0
    }
}

commentConnect: Comment ={
  commentId: 0,
  postId: 0
}
  

  toggleReplyToPost = () => {
    this.commentForm.get('text')?.patchValue('')
    this.replyToPost = !this.replyToPost
  }


  deleteComment = (comment: Post) => {
    this.comments = this.comments.filter(x => x.postId !== comment.postId);}

  getComments=()=>{
    this.postService.getByComments(this.post.postId||1).subscribe((post)=> {
      this.comments = post
    })

  }

  submitReply = (e: any) => {
    e.preventDefault()
    this.newPost.text = this.commentForm.value.text || ""
    this.newPost.title = "hallo"
    this.newPost.imageUrl= ".../assets/images/favicon.png"
    this.newPost.user.userId = +this.cookieService.get('userId')
    this.newPost.comment = true
    this.postService.postPost(this.newPost).subscribe((response) => {
      this.newPost = response
      this.commentConnect.commentId = this.newPost.postId||0
      this.commentConnect.postId = this.post.postId||0
      this.postService.postComment(this.commentConnect).subscribe( (response) => {this.getComments()})
      this.toggleReplyToPost()
    })
  }   

  bookmarkPosts(bookmarkPostId: number): void
    {
      // this will you the service to add a bookmark to the table 
      // need the current user 
      let newBookMark: Bookmark = 
      {
        post: 
        {
          postId: bookmarkPostId ,
        },
        user: 
        {
          userId: +this.cookieService.get('userId')
        }

      };

      this.bookMarkService.SaveBookmark(newBookMark)
      .subscribe(
        ()=> {console.log("Created a bookmark for postId: ",newBookMark)
      });
    }

  followUser(postAuthorId: number): void {
    let newFollow: Follow = {
    followedUser: {
        userId: postAuthorId
    },
    followerUser: {
        userId: +this.cookieService.get('userId')
    }
  }

  // add following 
  this.followService.IWillFollow(newFollow)
  .subscribe(()=> {
    console.log("new follow: ", newFollow);
  })
}
}
