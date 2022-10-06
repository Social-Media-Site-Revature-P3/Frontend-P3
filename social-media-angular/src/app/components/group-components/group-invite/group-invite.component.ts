import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GroupInvite } from 'src/app/interfaces/group-invite';
import { Follow } from 'src/app/interfaces/follow';
import { User } from 'src/app/interfaces/user';
import { GroupInviteService } from 'src/app/services/group-invite.service';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { FollowDialogComponent } from '../../follow-dialog/follow-dialog.component';
import { GroupFollowsComponent } from '../group-follows/group-follows.component';

@Component({
  selector: 'app-group-invite',
  templateUrl: './group-invite.component.html',
  styleUrls: ['./group-invite.component.css']
})
export class GroupInviteComponent implements OnInit {

  constructor(private cookieService: CookieService, private followService: FollowService, private dialog: MatDialog,
    private userService: UserService, private activatedRoute: ActivatedRoute, private groupInviteService: GroupInviteService) { }

    userId: number = +this.cookieService.get('userId')
    groupId: number = this.activatedRoute.snapshot.params['groupId']

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
        groupId: this.groupId
      }
      this.dialog.open(GroupFollowsComponent, dialogConfig);
    }
}
