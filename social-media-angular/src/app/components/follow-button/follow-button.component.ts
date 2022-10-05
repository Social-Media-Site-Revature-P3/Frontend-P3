import { OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { HeaderRowOutlet } from '@angular/cdk/table';
import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { endWith, withLatestFrom } from 'rxjs';
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
  currentUserId: number;

  follow: Follow


  // use the cookie to assign current user 
  constructor(private cookieService: CookieService, private followService: FollowService) { }

  ngOnInit(): void {
    // check to see if the user has followes someone
    this.followthisUser = this.followthisUser;
    this.currentUserId = +this.cookieService.get('userId');
    this.checkFollowingStatus();
  }

  followUser():void
  {
    // will create a new Following  Not opposit, its only putting in the user whos page were on... for some reason
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
    console.log(newFollow)

    this.followService.IWillFollow(newFollow)
    .subscribe(follow => {
      this.follow = follow;
      // window.location.reload();
    }) 


    this.followeduser = true;
    
  }

  unfollowUser(): void{
    this.followService.StopFollowingMe(this.follow.followId!).subscribe();
    this.followeduser = false; 
    // window.location.reload();
  }

  checkFollowingStatus():void
  {

    // check to see if they follow them 
    this.followService.WhoFollowsWho()
    .subscribe
    ((followLists: Follow[])=>{
        for(var follow of followLists)
        {
          if(follow.followedUser.userId == this.followthisUser && follow.followerUser.userId == this.currentUserId)
          {
            this.follow = follow;
            this.followeduser = true;
          }
            //this.followService.TheyAreFollowing(this.currentUserId).subscribe((follows: Follow[]) => {
            //for(let follow of follows) {
              //if(follow.followedUser.userId == this.followthisUser) {
                //this.followeduser = true;
                //this.follow = follow; that aint right, its not putting in the right user for the followed
        }
    })
  
  }

}

