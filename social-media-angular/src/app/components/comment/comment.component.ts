import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from "../../services/user.service";
import { Comment } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { LocalService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl(''),
  })

  @Input('comment') inputComment: Post | any;
  replyToComment: boolean = false;
  editToComment: boolean = false;
  creatorUser: boolean = false;
  
  user: User = {
    userId: undefined,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    nickname: ''
  }

  @Output() delete: EventEmitter<Post> = new EventEmitter();

  constructor(private postService: PostService,
              private authService: AuthService,
              private userService: UserService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    if (this.inputComment.user.userId == this.cookieService.get('userId')) {
      this.creatorUser = true;
    }
    this.commentForm.get('text')?.patchValue(this.inputComment.text);

    this.userService.GetUser(this.inputComment.user.userId).subscribe({
      next: user => {
        this.user= user;
      }
    })

    this.getComments()
  }

  toggleEditToComment = () => {
    if(this.replyToComment == true){
    this.replyToComment = !this.replyToComment
    }
    this.editToComment = !this.editToComment
  }

  deleteComment = () => {
    this.postService.deletePost(this.inputComment.postId).subscribe({
        next: data => {
          this.delete.emit(this.inputComment);
          this.toggleEditToComment();
          this.getComments();
          this.commentForm.get('text')?.patchValue('')
        },
        error: err => console.log(err)
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

  comments: Post[] = [{
    postId: 0,
    text: this.commentForm.value.text || "",
    title: "",
    imageUrl: "string",
    comment: true,
    user: {
      userId: +this.cookieService.get('userId')
    }
  }]

  commentConnect: Comment ={
    commentId: 0,
    postId: 0
  }

  toggleReplyToComment = () => {
    if(this.replyToComment == false){
       this.commentForm.get('text')?.patchValue('')}else{
        this.commentForm.get('text')?.patchValue(this.inputComment.text)
       }
       if(this.editToComment == true){
        this.editToComment = !this.editToComment
       }
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
    this.newPost.imageUrl= this.commentForm.value.imageUrl||""
    this.newPost.user.userId = + this.cookieService.get('userId')
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

  editReply=(e:any) => {
    e.preventDefault();
      this.newPost.postId = this.inputComment.postId
      this.newPost.text = this.commentForm.value.text || ""
      this.newPost.title = " " 
      this.inputComment.text = this.newPost.text
      this.newPost.imageUrl= ""
      this.newPost.user.userId = +this.cookieService.get('userId')
      this.postService.updatePost(this.newPost, this.inputComment.postId )
        .subscribe((response)=>{
          this.toggleEditToComment()
        })
  }
}
