import { Component, OnInit, Input} from '@angular/core';
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


  // use the cookie to assign current user 
  constructor(private cookieService: CookieService, private followService: FollowService) { }

  ngOnInit(): void {
    

    // check to see if the user has followes someone 
    this.currentUserId = +this.cookieService.get('userId');
    console.log("currentUser: ", this.currentUserId)
    console.log("followthisUser: ", this.followthisUser)
    this.checkFollowingStatus();

  }

  followUser():void
  {
    // will create a new Following 
    console.log("followthisUser: ", this.followthisUser)
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
    .subscribe(
      ()=> 
      {
        console.log("new follow: ", newFollow);
      }
    )

    this.followeduser = true;
  }

  unfollowUser(): void{
    // need to get the follow and then delete it 
    let unFollow: Follow;

    this.followService.TheyAreFollowing(this.currentUserId)
    .subscribe
    (
      
      (listOfFollows: Follow[])=>
      {
        for(var follow of listOfFollows )
        {
          if(follow.followedUser.userId === this.followthisUser)
          {
            
            unFollow = follow;
          }
        }

        // want to use that follow and delete by unfollowing 
        if(unFollow.followId != undefined)
        {
          this.followService.StopFollowingMe(unFollow.followId)
          .subscribe(
            ()=> 
            {
              console.log("Unfollow: ", unFollow);
            }
          )
        }
        
      }
    )

    this.followeduser = false;

  }

  checkFollowingStatus():void
  {
    // check to see if they follow them 
    this.followService.WhoFollowsWho()
    .subscribe
    (
      (followLists: Follow[])=>
      {
        for(var follow of followLists)
        {
          if(follow.followedUser.userId === this.followthisUser && follow.followerUser.userId === this.currentUserId)
          {
            this.followeduser = true;
          }
        }
      }
    )
    // if so followedUser = true 

    // if not followedUser = false 
  }

}
