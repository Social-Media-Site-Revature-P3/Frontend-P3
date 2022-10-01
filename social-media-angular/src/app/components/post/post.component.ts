import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Follow } from 'src/app/interfaces/follow';
import {Post} from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { Comment } from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/services/auth.service';
import { FollowServiceService } from 'src/app/services/follow-service.service';
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
    imageUrl: new FormControl(''),
  })

  @Input('post') post: Post | any;
  replyToPost: boolean = false;
  editToPost: boolean=false;
  creatorUser: boolean=false;
  comments: Post[] = [];
  user: User 
 
  constructor(private cookieService: CookieService,
              private postService: PostService,
              private authService: AuthService,
              private userService: UserService,
              private followService:FollowServiceService,
               private bookMarkService: BookmarkService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser
    // this.cookieService.get('userId').valueOf()
    if(this.post.user.userId==this.user.userId){
      this.creatorUser= true
    }

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
    imageUrl: "string",
    comment: true,
    user: {
        userId:  0
    }
}

commentConnect: Comment ={
  commentId: 0,
  postId: 0
}
  
toggleEditToPost=()=>{
  if(this.replyToPost){this.toggleReplyToPost()}
  this.commentForm.get('text')?.patchValue(this.post.text)
  this.commentForm.get('imageUrl')?.patchValue(this.post.imageUrl)
  this.editToPost = !this.editToPost
}
  toggleReplyToPost = () => {
    if(this.editToPost){this.toggleEditToPost()}
    this.commentForm.get('text')?.patchValue('')
    this.commentForm.get('imageUrl')?.patchValue('')
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
    this.newPost.imageUrl= this.commentForm.value.imageUrl||""
    this.newPost.user.userId =this.authService.currentUser.userId||0
    this.newPost.comment = true
    this.postService.postPost(this.newPost).subscribe((response) => {
      this.newPost = response
      this.commentConnect.commentId = this.newPost.postId||0
      this.commentConnect.postId = this.post.postId||0
      this.postService.postComment(this.commentConnect).subscribe( (response) => {this.getComments()})
      this.toggleReplyToPost()
    })
  }   

  editPost=(e:any) =>{
    this.newPost.text = this.commentForm.value.text || ""
    this.newPost.title = "hallo"
    this.newPost.imageUrl= this.commentForm.value.imageUrl||""
    this.newPost.user.userId =this.authService.currentUser.userId||0
    this.newPost.comment = false
    this.postService.updatePost(this.newPost, this.post.postId).subscribe((response) => {
      this.toggleReplyToPost()
    })

  }

  deletePost=()=>{
    this.postService.deletePost(this.post.postId).subscribe({
      next: data =>{
      this.toggleEditToPost();
      this.getComments();
      this.commentForm.get('text')?.patchValue('')
    },
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
          userId: this.authService.currentUser.userId||0
        }

      };

      this.bookMarkService.SaveBookmark(newBookMark)
      .subscribe(
        ()=> {console.log("Created a bookmark for postId: ",newBookMark)
      });
    }

  followUser(postAuthorId: number): void
{
  let newFollow: Follow = 
  {
    followedUser: {
        userId: postAuthorId
    },
    followerUser: {
        userId: this.authService.currentUser.userId||0
    }
  }

  // add following 
  this.followService.IWillFollow(newFollow)
  .subscribe(()=> {
    console.log("new follow: ", newFollow);
  })
}
}
