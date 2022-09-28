import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from '../interfaces/follow';
import { AuthService } from '../services/auth.service';
import { FollowServiceService } from '../services/follow-service.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.component.html',
  styleUrls: ['./follow-page.component.css']
})
export class FollowPageComponent implements OnInit {

  router:ActivatedRoute;
  followListUsers: User[] = [];
  followHeader: string = "";

  constructor(router: ActivatedRoute, private authService: AuthService, private followService: FollowServiceService, private userService: UserService) { 
    this.router = router;
  }

  ngOnInit(): void {
    this.displayFollow();
  }

  displayFollow():void{
    let action = parseInt(this.router.snapshot.paramMap.get('action')!, 10); 
    let userId = parseInt(this.router.snapshot.paramMap.get('userId')!, 10); 

    // 1 my followers
    if(action === 1)
    {
      this.followHeader = "My Followers";
      this.followService.followThemAll(userId)
      .subscribe(
        (data : Follow[])=> 
        {
          for(var follow of data)
          {
            this.userService.GetUser(follow.followerUser.userId)
            .subscribe
            (
              (myFollower: User)=> 
              {
                this.followListUsers.push(myFollower)
              }
            )
          }
        }
      )
    }

    // 2 who i am following 
    else
    {
      this.followHeader = "Following";
      this.followService.TheyAreFollowing(userId)
      .subscribe(
        (data : Follow[])=> 
        {
          for(var followed of data)
          {
            this.userService.GetUser(followed.followedUser.userId)
            .subscribe(
              (following: User)=> 
              {
                this.followListUsers.push(following)
              }
            )
          }
        }
      )
    }
  }

}
