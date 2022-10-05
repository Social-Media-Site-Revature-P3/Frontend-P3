import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserEvent } from 'src/app/interfaces/user-event';
import { UserEventService } from 'src/app/services/user-event.service';
import { EventPageComponent } from '../event-page/event-page.component';

@Component({
  selector: 'app-event-button',
  templateUrl: './event-button.component.html',
  styleUrls: ['./event-button.component.css']
})
export class EventButtonComponent implements OnInit {

  @Input('userId') userId: number;

  constructor(private cookieService: CookieService, private userEventService: UserEventService, private activateRoute: ActivatedRoute, private dialog: MatDialog) { }

  userEvents: UserEvent[] = [{
    user: {
      userId: 0
    },
    event: {
      eventId: 0
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
      dialogConfig.data = this.userEvents;
      let dialogRef = this.dialog.open(EventPageComponent, dialogConfig)  
    })
  }

}
