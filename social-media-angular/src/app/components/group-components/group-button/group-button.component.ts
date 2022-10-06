import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGroup } from 'src/app/interfaces/user-group';
import { UserGroupService } from 'src/app/services/user-group.service';
import { GroupListComponent } from '../group-list/group-list.component';
@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.css']
})
export class GroupButtonComponent implements OnInit {

  @Input('userId') userId: number;
  @Input('firstName') firstName: string;
  @Input('pageUser') pageUserId: number;

  constructor(private cookieService: CookieService, private userGroupService: UserGroupService, private activateRoute: ActivatedRoute, private dialog: MatDialog) { }

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
    about: '',
  },
  creator: false,
  admin: false,
  }]

  ngOnInit(): void {
  }

  myGroups() {
    this.userGroupService.getByUserId(this.userId).subscribe((groups: UserGroup[]) => {
      this.userGroups = groups;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus= true;
      dialogConfig.height= "85%"
      dialogConfig.width = "80%";
      dialogConfig.data = {
        userGroups: this.userGroups,
        firstName: this.firstName,
        pageUserId: this.pageUserId,
        userId: this.userId};
      let dialogRef = this.dialog.open(GroupListComponent, dialogConfig)
    })
  }
}
