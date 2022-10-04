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
    this.followthisUser = Number(this.followthisUser);
    this.currentUserId = +this.cookieService.get('userId');
    console.log("currentUser: ", this.currentUserId)
    console.log("followthisUser: ", this.followthisUser)
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
    .subscribe(
      ()=> 
      {
        console.log("new follow: ", newFollow);
        window.location.reload();
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
        // console.log("FOLLOWING USER ID", this.followthisUser)
        for(var follow of listOfFollows )
        {
          if(follow.followedUser.userId === this.followthisUser)
          {
            
            unFollow = follow;
          }
        }

        // console.log("UNFOLLOW: ", unFollow)
        // want to use that follow and delete by unfollowing 
        if(unFollow.followId !== undefined)
        {
          this.followService.StopFollowingMe(unFollow.followId)
          .subscribe(
            ()=> 
            {
              console.log("Unfollow: ", unFollow);
              window.location.reload();
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
          console.log(" BEFORE IF FOLLOWING: ", this.followeduser)
          console.log("FOLLOW THIS PERSON :", this.followthisUser)
          console.log("FOLLOW YOU  :", this.currentUserId)
          if(follow.followedUser.userId == this.followthisUser && follow.followerUser.userId == this.currentUserId)
          {

            this.followeduser = true;
            console.log(" AFTER IF FOLLOWING: ", this.followeduser)
          }
        }
      }
    )
    // if so followedUser = true 

    // if not followedUser = false 
  }

}
