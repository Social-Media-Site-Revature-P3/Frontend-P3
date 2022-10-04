import { Component, OnInit, Input} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { Bookmark } from 'src/app/interfaces/bookmark';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input('post') post: Post | any;
  color : string = "basic";
  user: User ;
  constructor(private userService: UserService, private bookMarkService: BookmarkService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userService.GetUser(this.post.user.userId).subscribe({
      next: user => {
        this.post.user = user;
      }
    });

    this.bookmarkColor();
  }

  bookmarkPosts(bookmarkPostId: number): void
    {
      // this will you the service to add a bookmark to the table 
      // need the current user 

      if (this.color !== "primary")
      {
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

      this.color = "primary"

      }

      else
      {
        let removeBookmark: Bookmark;
        this.bookMarkService.GetAllBookmarks()
        .subscribe(
          (data : Bookmark[])=>
          {
            for(var bookmark of data)
            {
              if(bookmark.post.postId === this.post.postId)
              {
                removeBookmark = bookmark;
              }
            }

            if(removeBookmark.bookmarkId != undefined)
            {
              this.bookMarkService.RemoveBookmark(removeBookmark.bookmarkId)
            .subscribe
            (
              ()=> {console.log("removeBookmark:", removeBookmark)}
            )
            }
            
          }
        )

        this.color = "basic";
      }
      
    }

    bookmarkColor():void
    {
      this.bookMarkService.GetAllBookmarks()
      .subscribe
      (
        (data: Bookmark[] )=> 
        {
          for(var bookmark of data)
          {
            if(bookmark.post.postId === this.post.postId)
            {
              this.color = "primary";
            }
          }
        }
      )
    }


}
