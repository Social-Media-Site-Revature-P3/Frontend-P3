import { Component, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGroup } from 'src/app/interfaces/user-group';
import { UserGroupService } from 'src/app/services/user-group.service';
import { GroupService } from 'src/app/services/group.service'
import { NewGroupComponent }  from '../new-group/new-group.component';
import { GroupMembersDialogComponent } from '../group-members-dialog/group-members-dialog.component'

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit, OnChanges {

  @Input('groupId') groupId: number;

  userGroups: UserGroup[] = [{
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      nickname: '',
      profilePicture: '',
      email: '',
  },
  group: {
    groupId: 0,
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  },
  creator: false,
  admin: false,
  }]

  userGroup: UserGroup = {
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      nickname: '',
      profilePicture: '',
      email: '',
  },
  group: {
    groupId: 0,
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  },
  creator: false,
  admin: false,
  }

  constructor(private userGroupService: UserGroupService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.displayCount();
  }

  displayCount() {
    this.userGroupService.getBygroupId(this.groupId).subscribe(userGroups => {
      this.userGroups = userGroups;
      console.log(this.userGroups)
      for(let userGroup of userGroups) {
        let i: number = 0;
        if(i < 1) {
          this.userGroup = userGroup;
          i++;
        }
      }
    })
  }

  displayMembers() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height= "85%";
    dialogConfig.width = "80%";
    dialogConfig.data = {
      userGroups: this.userGroups,
      userGroup: this.userGroup
    }
    let dialogRef = this.dialog.open(GroupMembersDialogComponent, dialogConfig)
  }
}
