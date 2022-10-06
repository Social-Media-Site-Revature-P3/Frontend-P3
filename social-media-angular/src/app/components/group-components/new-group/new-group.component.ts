
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Group } from 'src/app/interfaces/group';
import { UserGroup } from 'src/app/interfaces/user-group';
import { GroupService } from 'src/app/services/group.service';
import { UserGroupService } from 'src/app/services/user-group.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewGroupComponent>,
    private dialog: MatDialog, private cookieService: CookieService, private groupService: GroupService,
    private userGroupService: UserGroupService) { }

  group: Group = {
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  }

  invite: string;

  ngOnInit(): void {
  }

  submit() {

    this.groupService.createGroup(this.group).subscribe(newGroup => {
      this.groupService.getByGroupId(newGroup.groupId!).subscribe(group => {
        let userGroup: UserGroup = {
          user: {
            userId: +this.cookieService.get('userId'),
          },
          group: {
            groupId: group.groupId!,
          },
          creator: true,
          admin: true
        }
        this.userGroupService.createUserGroup(userGroup).subscribe()
        this.dialogRef.close(newGroup)
      })
    })
  }

  inviteOrRequest() {
    console.log(this.invite)
    if(this.invite == "invite") {
      this.group.inviteOnly = false;
      this.group.request = true;
    }
    if(this.invite == "request") {
      this.group.request = false;
      this.group.inviteOnly = true;
    }

  }

}
