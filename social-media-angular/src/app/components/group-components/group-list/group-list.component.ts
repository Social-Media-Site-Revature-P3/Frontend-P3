import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGroup } from 'src/app/interfaces/user-group';
import { GroupService } from 'src/app/services/group.service'
import { NewGroupComponent }  from '../new-group/new-group.component';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['picture', 'name', 'about', 'delete']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<GroupListComponent>,
  private dialog: MatDialog, private cookieService: CookieService, private router: Router, private groupService: GroupService) { }

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

  userId: number = +this.cookieService.get('userId')

  ngOnInit(): void {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  goToGroup(groupId: number) {
    this.close();
    this.router.navigate(['/group-page/', groupId])
  }

  newGroup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "80%";
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(NewGroupComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(newGroup => {
      this.dialogRef.close();
    })
  }

  deleteGroup(groupId: number, i: number) {
    this.groupService.deleteByGroupId(groupId).subscribe()
    this.data.userGroups.splice(i, 1);
    this.table.renderRows();
  }
}
