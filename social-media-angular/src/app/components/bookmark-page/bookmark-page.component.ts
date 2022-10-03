import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/interfaces/bookmark';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.css']
})
export class BookmarkPageComponent implements OnInit {

  usersBookmarkPosts: Post[] = [];
  currentUserId: number =0;
  user: User = 
  {
    userId: 0,
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  }
  constructor( private authService: AuthService, private userService: UserService, private bookmarkService: BookmarkService, private postService: PostService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getUsersBookmarkPosts();
  }


  getUsersBookmarkPosts():void
  {
    this.currentUserId= +this.cookieService.get('userId');

    this.userService.GetUser(this.currentUserId)
    .subscribe(
      (user: User)=>
      {
        this.user = user;
      }
    )


    this.bookmarkService.GetUserBookmarks(this.currentUserId)
    .subscribe(
      (data: Bookmark[])=>
      {
        console.log("Users Bookmarks in bookmark-page: ", data)

        // using bookmarks to get posts and then will display them 
        for(var bookmark of data )
        {
          this.postService.getbyPostId(bookmark.post.postId || 0)
          .subscribe(
            (post: Post)=> 
            {
              this.usersBookmarkPosts.push(post)
            }
          )
        }


      }
    )
  }

}
