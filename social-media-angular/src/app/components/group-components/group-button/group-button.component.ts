import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGroup } from 'src/app/interfaces/user-group';
import { UserGroupService } from 'src/app/services/user-group.service';
import { GroupListComponent } from '../group-list/group-list.component';
import { GroupPageComponent } from '../group-page/group-page.component';
@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.css']
})
export class GroupButtonComponent implements OnInit {

  @Input('userId') userId: number;
  @Input('firstName') firstName: string;

  constructor(private cookieService: CookieService, private userGroupService: UserGroupService, private activateRoute: ActivatedRoute, private dialog: MatDialog) { }

  userGroups: UserGroup[] = [{
    user: {
      userId: 0
    },
    group: {
      groupId: 0,
    },
    creator: false,
    admin: false
  }]

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params['userId'];
  }

  myGroups() {
    this.userGroupService.getByUserId(this.userId).subscribe((events: UserGroup[]) => {
      this.userGroups = events;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus= true;
      dialogConfig.height= "85%"
      dialogConfig.width = "80%";
      dialogConfig.data = {
        userEvents: this.userGroups,
        firstName: this.firstName};
      let dialogRef = this.dialog.open(GroupListComponent, dialogConfig)
    })
  }
}
