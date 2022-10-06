import { Component, Input, OnChanges, OnInit } from '@angular/core';
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

  @Input('event') event: Event

  userEvent: UserEvent = {
    userEventId: undefined,
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
    this.userEvent.user.userId = +this.cookieService.get('userId')
    this.userEvent.event.eventId = this.activatedRoute.snapshot.params['eventId']
    this.getEventByUserId();
    
  }

  getEventByUserId()   {
    this.userEventService.getByUserId(this.userEvent.user.userId).subscribe((events: UserEvent[]) => {
      for(let event of events) {
        if(event.event.eventId == this.userEvent.event.eventId) {
          this.joined = true;
          this.userEvent = event;
        }
      }
    })
  }

  joinEvent() {
    this.userEventService.createUserEvent(this.userEvent).subscribe((event) => {
      this.joined = true;
      this.userEvent = event;
      this.getEventByUserId();
    })
  }

  leaveEvent() {
    this.userEventService.deleteByUserEventId(this.userEvent.userEventId!).subscribe(() => {
      this.joined = false;
    })
  }
}
