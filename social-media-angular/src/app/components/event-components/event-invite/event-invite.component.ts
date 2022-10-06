import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventInvite } from 'src/app/interfaces/event-invite';
import { Follow } from 'src/app/interfaces/follow';
import { User } from 'src/app/interfaces/user';
import { EventInviteService } from 'src/app/services/event-invite.service';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { FollowDialogComponent } from '../../follow-dialog/follow-dialog.component';
import { EventFollowsComponent } from '../event-follows/event-follows.component';

@Component({
  selector: 'app-event-invite',
  templateUrl: './event-invite.component.html',
  styleUrls: ['./event-invite.component.css']
})
export class EventInviteComponent implements OnInit {

  constructor(private cookieService: CookieService, private followService: FollowService, private dialog: MatDialog,
              private userService: UserService, private activatedRoute: ActivatedRoute, private eventInviteService: EventInviteService) { }

  userId: number = +this.cookieService.get('userId')
  eventId: number = this.activatedRoute.snapshot.params['eventId']

  follows: Follow[] = [{
    followedUser: {
      userId: 0,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      profilePicture: undefined
    },
    followerUser: {
      userId: 0,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      profilePicture: undefined
    }
  }]


  user: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  ngOnInit(): void {
    this.userService.GetUser(this.userId).subscribe(user => {
      this.user = user;
    })
    this.getFollowing();
  }

  getFollowing() {
    this.followService.TheyAreFollowing(this.userId).subscribe(follows => {
      this.follows = follows;
    })
  }

  openFollows() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height= "65%"
    dialogConfig.width = "50%";
    dialogConfig.data = {
      followTitle: this.user.firstName + "'s Follows",
      followUserList: this.follows,
      follow: "following",
      eventId: this.eventId
    }
    this.dialog.open(EventFollowsComponent, dialogConfig);
  }
}
