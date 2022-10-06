import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from '../../interfaces/follow';
import { AuthService } from '../../services/auth.service';
import { FollowService } from '../../services/follow.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

import { FollowDialogComponent } from '../follow-dialog/follow-dialog.component';


@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.component.html',
  styleUrls: ['./follow-page.component.css']
})
export class FollowPageComponent implements OnInit, OnChanges {

  
  currentUserDisplay: User = {
    userId: 0,
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  };
  router:ActivatedRoute;
  followingListUsers: Follow[] = [];
  followerListUsers: Follow[] = [];
  followTitle: string = "";
  
  constructor(router: ActivatedRoute, private authService: AuthService, private followService: FollowService, private userService: UserService, private dialog: MatDialog) { 
    
  }

  @Input('userId') userId : number; 

  ngOnInit(): void {
  }

  ngOnChanges() {
    // this.userId = this.router.snapshot.params['userId'];
    this.displayCount();
  }

  displayCount(): void
  {
    this.followService.TheyAreFollowing(this.userId).subscribe((follows: Follow[]) => {

      for(var follow of follows)
      {
        if(follow.followedUser.userId !== this.userId)
        {
          this.followingListUsers.push(follow)
          console.log(follows)
        }
      }
      //this.followingListUsers = follows;
    })
    this.followService.followThemAll(this.userId).subscribe((follows: Follow[]) => {
      for(var follow of follows)
      {
        if(follow.followerUser.userId !== this.userId)
        {
          this.followerListUsers.push(follow)
          console.log(follows)
        }
      }
      
    })
  }

  displayFollowing() {
    this.userService.GetUser(this.userId)
      .subscribe(
        (user: User)=> {
          this.currentUserDisplay = user;
          console.log("user profile", this.currentUserDisplay)

          this.followTitle = this.currentUserDisplay.firstName + "'s Follows";
          // the people who this user is following 
          // need to be with in the display thingy : followHeader: string = ""; 
          const dialogDisplay = this.dialog.open(FollowDialogComponent, {
              data: {
                followTitle: this.followTitle,
                followUserList: this.followingListUsers,
                follow: "following"
              }
            });
          dialogDisplay.afterClosed().subscribe()
        }
      )
  }

  displayFollowers(): void
  {
    this.userService.GetUser(this.userId)
    .subscribe(
      (user: User)=>
      {
        this.currentUserDisplay = user;
        console.log(" user profile", this.currentUserDisplay)

        console.log("this.followTitle",this.followTitle)
        this.followTitle = this.currentUserDisplay.firstName + "'s Followers";
        // the people who this user is following 
        // need to be with in the display thingy : followHeader: string = ""; 
        const dialogDisplay = this.dialog.open(FollowDialogComponent, 
          {
            data: {
              followTitle: this.followTitle,
              followUserList: this.followerListUsers,
              follow: "follower"
            }
          });

      dialogDisplay.afterClosed()
      .subscribe(
        ()=> 
        {
        }
      )
      }
    )
  }


}
