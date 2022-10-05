import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserEvent } from 'src/app/interfaces/user-event';
import { UserEventService } from 'src/app/services/user-event.service';
import { EventListComponent } from '../event-list/event-list.component';
import { EventPageComponent } from '../event-page/event-page.component';

@Component({
  selector: 'app-event-button',
  templateUrl: './event-button.component.html',
  styleUrls: ['./event-button.component.css']
})
export class EventButtonComponent implements OnInit {

  @Input('userId') userId: number;
  @Input('firstName') firstName: string;

  constructor(private cookieService: CookieService, private userEventService: UserEventService, private activateRoute: ActivatedRoute, private dialog: MatDialog) { }

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
    this.userId = this.activateRoute.snapshot.params['userId'];
  }

  myEvents() {
    this.userEventService.getByUserId(this.userId).subscribe((events: UserEvent[]) => {
      this.userEvents = events;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus= true;
      dialogConfig.height= "85%"
      dialogConfig.width = "80%";  
      dialogConfig.data = {
        userEvents: this.userEvents, 
        firstName: this.firstName};
      let dialogRef = this.dialog.open(EventListComponent, dialogConfig)  
    })
  }

}
