import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Event } from 'src/app/interfaces/event';
import { UserEvent } from 'src/app/interfaces/user-event';
import { UserEventService } from 'src/app/services/user-event.service';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.css']
})
export class EventRequestComponent implements OnInit {

  constructor(private cookieService: CookieService, private userEventService: UserEventService, private activatedRoute: ActivatedRoute) {}

  joined: boolean = false;
  userId: number;
  eventId: number;

  userEvent: UserEvent = {
    user: {
      userId: 0,
    },
    event: {
      eventId: 0,
    },
    creator: false,
    admin: false
  }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
    this.eventId = this.activatedRoute.snapshot.params['eventId']
    this.userEventService.getByUserId(this.userId).subscribe((events: UserEvent[]) => {
      console.log(events)
      for(let event of events) {
        if(event.event.eventId == this.eventId) {
          this.joined = true;
        }
      }
    })
  }

  joinEvent() {

  }

}
