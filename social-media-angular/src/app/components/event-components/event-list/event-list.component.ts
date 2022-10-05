import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserEvent } from 'src/app/interfaces/user-event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  displayedColumns: string[] = ['picture', 'name', 'date']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EventListComponent>,
  private dialog: MatDialog, private cookieService: CookieService, private router: Router) { }

  userEvents: UserEvent[] = [{
    user: {
      userId: 0,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      profilePicture: undefined,
      email: undefined
    },
    event: {
      eventId: 0,
      date: undefined,
      group: undefined,
      info: undefined,
      inviteOnly: undefined,
      name: undefined,
      request: undefined,
      time: undefined,
      picture: undefined
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

  goToEvent(eventId: number) {
    this.close();
    this.router.navigate(['/event-page/', eventId])
  }

}

