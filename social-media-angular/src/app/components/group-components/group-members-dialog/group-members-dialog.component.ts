import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-group-members-dialog',
  templateUrl: './group-members-dialog.component.html',
  styleUrls: ['./group-members-dialog.component.css']
})
export class GroupMembersDialogComponent implements OnInit {

  displayedColumns: string[] = ['picture', 'name', 'follow']
  userId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<GroupMembersDialogComponent>,
  private dialog: MatDialog, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
  }

  close() {
    this.dialogRef.close();
  }

  goToMember(userId: number) {
    this.close();
    this.router.navigate(['/profile/', userId])
  }
}
