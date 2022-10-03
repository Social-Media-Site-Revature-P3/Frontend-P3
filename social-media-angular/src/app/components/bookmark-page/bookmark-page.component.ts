import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/interfaces/bookmark';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.css']
})
export class BookmarkPageComponent implements OnInit {

  constructor( private authService: AuthService, private bookmarkService: BookmarkService, private postService: PostService) { }
  usersBookmarkPosts: Post[] = [];
  ngOnInit(): void {
    this.getUsersBookmarkPosts();
  }


  getUsersBookmarkPosts():void
  {
    let currentUserId: number = this.authService.currentUser.userId||0;

    this.bookmarkService.GetUserBookmarks(currentUserId)
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
              this.usersBookmarkPosts.push( post)
            }
          )
        }


      }
    )
  }

}
