import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Follow } from 'src/app/interfaces/follow';
import Post from 'src/app/models/Posts';
import { AuthService } from 'src/app/services/auth.service';
import { FollowServiceService } from 'src/app/services/follow-service.service';
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

  constructor(private postService: PostService, private authService: AuthService, private followService:FollowServiceService) { }

  ngOnInit(): void {
  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
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


