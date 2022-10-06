import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-event-members-dialog',
  templateUrl: './event-members-dialog.component.html',
  styleUrls: ['./event-members-dialog.component.css']
})
export class EventMembersDialogComponent implements OnInit {

  displayedColumns: string[] = ['picture', 'name', 'follow']
  userId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EventMembersDialogComponent>,
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
