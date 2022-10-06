import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GroupInvite } from 'src/app/interfaces/group-invite';
import { UserGroup } from 'src/app/interfaces/user-group';
import { GroupInviteService } from 'src/app/services/group-invite.service';
import { UserGroupService } from 'src/app/services/user-group.service';

@Component({
  selector: 'app-group-follows',
  templateUrl: './group-follows.component.html',
  styleUrls: ['./group-follows.component.css']
})
export class GroupFollowsComponent implements OnInit {

  userId: number

  groupInvite: GroupInvite = {
    accepted: false,
    group: {
      groupId: 0
    },
    groupInviter: {
      userId: 0
    },
    newGroupMember: {
      userId: 0
    }
  }

  constructor(public dialogDisplay: MatDialogRef<GroupFollowsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private router: Router, private cookieService: CookieService,
    private userGroupService: UserGroupService, private activateRoute: ActivatedRoute, private groupInviteService: GroupInviteService) { }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')

  }

  onNoClick(): void
  {
    this.dialogDisplay.close();
  }

  // this is where our click buttons and routing

  display(userId: number): void
  {
    console.log("DISPLAY UserID: ", userId)

    this.onNoClick();

    this.router.navigate(['/profile/', userId], { replaceUrl: true })
    .then(
      ()=>
      {
        window.location.reload();
      }
    )
  }

  invite(userId: number, groupId: number) {
    this.groupInvite.groupInviter.userId = this.userId;
    this.groupInvite.group.groupId = groupId;
    this.groupInvite.newGroupMember.userId = userId;
    this.groupInviteService.createGroupInvite(this.groupInvite).subscribe(res => {
      console.log(res)
    })
  }
}
