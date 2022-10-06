import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserEvent } from 'src/app/interfaces/user-event';
import { EventService } from 'src/app/services/event.service';
import { NewEventComponent } from '../new-event/new-event.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['picture', 'name', 'date', 'delete']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EventListComponent>,
  private dialog: MatDialog, private cookieService: CookieService, private router: Router, private eventService: EventService) { }

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

  userId: number = +this.cookieService.get('userId')

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

  newEvent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "80%";
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(NewEventComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(newEvent => {
      this.dialogRef.close();
    })
  }

  cancelEvent(eventId: number, i: number) {
    this.eventService.deleteByEventId(eventId).subscribe()
    this.data.userEvents.splice(i, 1);
    this.table.renderRows();
  }
}

