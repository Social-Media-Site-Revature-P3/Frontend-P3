import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from '../../interfaces/follow';
import { AuthService } from '../../services/auth.service';
import { FollowService } from '../../services/follow.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FollowDialogComponent } from 'src/app/follow-dialog/follow-dialog.component';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.component.html',
  styleUrls: ['./follow-page.component.css']
})
export class FollowPageComponent implements OnInit {

  @Input('userId') userId : number; 
  // userId:number = 0; 

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
  followingListUsers: User[] = [];
  followerListUsers: User[] = [];
  followTitle: string = "";
  

  




  constructor(router: ActivatedRoute, private authService: AuthService, private followService: FollowService, private userService: UserService, private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {

    // this.userId = this.router.snapshot.params['userId'];
    console.log("USER ID: ", this.userId);

    this.displayCount();
  }

  displayCount(): void
  {
    //following 
    console.log("USER ID 1: ", this.userId);
    this.followService.WhoFollowsWho()
    .subscribe(
      (data: Follow[])=> 
      {
        console.log("USER ID 2: ", this.userId);
        for(var follow of data)
        {
          if(follow.followedUser.userId === this.userId)
          {
            console.log("USER ID 3: ", this.userId);
            // follower 
            this.userService.GetUser(follow.followerUser.userId)
            .subscribe(
              (user: User)=> 
              {
                this.followerListUsers.push(user)
              }
            )
          }

          else if(follow.followerUser.userId === this.userId)
          {
            // the people there following 
            this.userService.GetUser(follow.followedUser.userId)
            .subscribe(
              (user: User)=> 
              {
                this.followingListUsers.push(user)
              }
            )
          }
        }
  
      }
    )


    // console.log("USER ID 1: ", this.userId);
    // // gets the users that are following this user 
    // this.followService.followThemAll(this.userId)
    // .subscribe(
    // (data: Follow[])=> 
    // {
    //   console.log("USER ID 2: ", this.userId);
    //   console.log(" FOLLOW THEM ALL: ", data)
    //   for(var follow of data)
    //   {
    //     console.log("USER ID 3: ", this.userId);
    //     //since they will be a follower of themselves avoids the following 
    //     if(this.userId !== follow.followerUser.userId)
    //     {
    //       this.userService.GetUser(follow.followerUser.userId)
    //       .subscribe(
    //         (user: User)=> 
    //         {
    //           this.followerListUsers.push(user)
    //         }
    //       )
    //     }
            

    //   }
    // }

    // )

    // console.log("USER ID: ", this.userId);
    // // gets a list of users they are following 
    // this.followService.TheyAreFollowing(this.userId)
    // .subscribe(
    //   (data: Follow[])=> 
    //   {
    //     console.log(" THEY ARE FOLLOWING DATA: ", data)
    //     for(var follow of data)
    //     {
          
    //       //since they will be following themselves avoids counting themselves 
    //       if(this.userId !== follow.followedUser.userId)
    //       {
    //         this.userService.GetUser(follow.followedUser.userId)
    //         .subscribe(
    //           (user: User)=> 
    //           {
    //             this.followingListUsers.push(user)
    //           }
    //         )
    //       }
            

    //     }
    //   }
    // )


    
    

  }

  displayFollowing(): void
  {

    console.log("USER ID: ", this.userId);


    this.userService.GetUser(this.userId)
    .subscribe(
      (user: User)=>
      {
        this.currentUserDisplay = user;
        console.log(" user profile", this.currentUserDisplay)

        this.followTitle = this.currentUserDisplay.firstName + " Following";
    // the people who this user is following 
    // need to be with in the display thingy : followHeader: string = ""; 
    const dialogDisplay = this.dialog.open(FollowDialogComponent, 
      {
        data: {
          followTitle: this.followTitle,
          followUserList: this.followingListUsers
        }
      }
      );

      dialogDisplay.afterClosed()
      .subscribe(
        ()=> 
        {
          console.log(this.followTitle + "closed");
        }
      )

   

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
    this.followTitle = this.currentUserDisplay.firstName + " Followers";
    // the people who this user is following 
    // need to be with in the display thingy : followHeader: string = ""; 
    const dialogDisplay = this.dialog.open(FollowDialogComponent, 
      {
        data: {
          followTitle: this.followTitle,
          followUserList: this.followerListUsers
        }
      }
      );

      dialogDisplay.afterClosed()
      .subscribe(
        ()=> 
        {
          console.log(this.followTitle + "closed");
        }
      )
      }
    )



    

      

  }


}
