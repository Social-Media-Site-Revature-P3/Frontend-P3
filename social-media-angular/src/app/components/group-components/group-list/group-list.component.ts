import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGroup } from 'src/app/interfaces/user-group';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  displayedColumns: string[] = ['picture', 'name', 'date']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<GroupListComponent>,
  private dialog: MatDialog, private cookieService: CookieService, private router: Router) { }

  userGroup: UserGroup[] = [{
    user: {
      userId: 0
    },
    group: {
      groupId: 0
    },
    creator: false,
    admin: false
  }]

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
}
