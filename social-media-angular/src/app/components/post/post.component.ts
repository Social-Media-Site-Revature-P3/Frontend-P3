import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Comment} from "../../interfaces/comment";
import {UserService} from "../../services/user.service";

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

  constructor(private postService: PostService,
              private authService: AuthService,
              private userService: UserService) {

  }

  ngOnInit(): void {

    this.userService.GetUser(this.post.user.userId).subscribe({
      next: user => {
        this.post.user = user;
      }
    })

    this.postService.getByComments(this.post.postId).subscribe({
      next: data => this.comments = data
    })

  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  deleteComment = (comment: Post) => {
    this.comments = this.comments.filter(x => x.postId !== comment.postId);
  }

  submitReply = (e: any) => {
    e.preventDefault()
    if (this.commentForm.valid) {
      const post:Post = {
        imageUrl: '',
        text: this.commentForm.get("text")?.value || '',
        title: '',
        user: {
          userId: this.authService.currentUser.userId || 0
        }
      }

      this.postService.createPost(post)
        .subscribe(
          (data) => {
            this.commentForm.get("text")?.patchValue('');
            let newComment: Comment = {
              commentId: data.postId ? data.postId : 0,
              postId: this.post.postId | 0
            }

            let comment = data;
            this.postService.postComment(newComment)
              .subscribe(
                (response) => {
                  this.comments.push(comment);
                  this.toggleReplyToPost()
                }
              )
          }
        )
    }else {
      this.commentForm.markAllAsTouched();
    }

  }
}
