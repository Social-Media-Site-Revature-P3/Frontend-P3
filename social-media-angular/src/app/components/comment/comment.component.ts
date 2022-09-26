import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Post} from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Comment } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })
  user: User =this.authService.currentUser

  @Input('comment') inputComment: Post;
  replyToComment: boolean = false

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
  postId: 0,
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

  toggleReplyToComment = () => {
    this.replyToComment = !this.replyToComment
  }


  getComments=()=>{
    this.postService.getByComments(this.inputComment.postId||1).subscribe((post)=> {
      this.comments = post
    })
  }


  submitReply = (e: any) => {
    e.preventDefault()
    this.newPost.text = this.commentForm.value.text || ""
    this.newPost.title = "hallo"
    this.newPost.imageUrl= "assets/images/favicon.png"
    this.newPost.user.userId =this.authService.currentUser.userId||0
    this.postService.postPost(this.newPost)
      .subscribe(
        (response) => {
          this.newPost = response
          this.commentConnect.commentId = this.newPost.postId||0
          this.commentConnect.postId = this.inputComment.postId||0
          this.postService.postComment(this.commentConnect).subscribe( (response) => {this.getComments()})
          this.toggleReplyToComment()
        }
      )
  }
}
