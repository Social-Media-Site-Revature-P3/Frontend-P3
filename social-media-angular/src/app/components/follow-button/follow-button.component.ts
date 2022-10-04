import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Follow } from 'src/app/interfaces/follow';
import { FollowService } from 'src/app/services/follow.service';


@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  // the user id of the person they are searching 
  @Input('userId') followthisUser: number;

  followeduser: boolean = false;
  currentUserId: number ;

  follow: Follow


  // use the cookie to assign current user 
  constructor(private cookieService: CookieService, private followService: FollowService) { }

  ngOnInit(): void {
    // check to see if the user has followes someone 
    this.currentUserId = +this.cookieService.get('userId');
    this.checkFollowingStatus();
  }

  followUser():void
  {
    // will create a new Following 
    let newFollow : Follow = 
    {
     followedUser:
     {
      userId: this.followthisUser
     },
     followerUser:
     {
      userId: this.currentUserId
     }

    }

    this.followService.IWillFollow(newFollow)
    .subscribe(follow => {
      this.follow = follow;
    })

    this.followeduser = true;
  }

  unfollowUser(): void{
    // need to get the follow and then delete it 
    this.followService.StopFollowingMe(this.follow.followId!).subscribe();
    this.followeduser = false;
  }

  checkFollowingStatus():void
  {
    this.followService.TheyAreFollowing(this.currentUserId).subscribe((follows: Follow[]) => {
      for(let follow of follows) {
        if(follow.followedUser.userId == this.followthisUser) {
          this.followeduser = true;
          this.follow = follow;
        }
      }
    })
  }

}
