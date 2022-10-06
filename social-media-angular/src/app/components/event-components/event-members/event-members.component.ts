import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UserEvent } from 'src/app/interfaces/user-event';
import { UserEventService } from 'src/app/services/user-event.service';
import { EventMembersDialogComponent } from '../event-members-dialog/event-members-dialog.component';

@Component({
  selector: 'app-event-members',
  templateUrl: './event-members.component.html',
  styleUrls: ['./event-members.component.css']
})
export class EventMembersComponent implements OnInit, OnChanges {

  @Input('eventId') eventId: number;

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

  userEvent: UserEvent = {
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
  }

  constructor(private userEventService: UserEventService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.displayCount();
  }

  displayCount() {
    this.userEventService.getByEventId(this.eventId).subscribe(userEvents => {
      this.userEvents = userEvents;
      for(let userEvent of userEvents) {
        let i: number = 0;
        if(i < 1) {
          this.userEvent = userEvent;
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
      userEvents: this.userEvents,
      userEvent: this.userEvent
    } 
    let dialogRef = this.dialog.open(EventMembersDialogComponent, dialogConfig)
  }

}
