import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Post} from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { Comment } from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  replyToPost: boolean = false

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
  this.getComments()
  }

  newPost: Post = {
    text:  "",
    title: "",
    imageUrl: "string",
    user: {
        userId:  0
    }
}

comments: Post[] = [{
  text: this.commentForm.value.text || "",
  title: "",
  imageUrl: "string",
  user: {
      userId:  this.authService.currentUser.userId||0
  }
}]

commentConnect: Comment ={
  commentId: 0,
  postId: 0
}
  user: User =this.authService.currentUser

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

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
    this.newPost.user.userId =this.authService.currentUser.userId||0
    this.postService.postPost(this.newPost)
      .subscribe(
        (response) => {
          this.newPost = response
          this.commentConnect.commentId = this.newPost.postId||0
          this.commentConnect.postId = this.post.postId||0
          this.postService.postComment(this.commentConnect).subscribe( (response) => {this.getComments()})
          this.toggleReplyToPost()
        }
      )
  }

  bookmarkPosts(postId: number): void
  {
    // this will you the service to add a bookmark to the table 
    // need the current user 
    

  }
}
