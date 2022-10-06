import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventInvite } from 'src/app/interfaces/event-invite';
import { UserEvent } from 'src/app/interfaces/user-event';
import { EventInviteService } from 'src/app/services/event-invite.service';
import { UserEventService } from 'src/app/services/user-event.service';

@Component({
  selector: 'app-event-follows',
  templateUrl: './event-follows.component.html',
  styleUrls: ['./event-follows.component.css']
})
export class EventFollowsComponent implements OnInit {

  userId: number

  eventInvite: EventInvite = {
    accepted: false,
    event: {
      eventId: 0
    },
    eventInviter: {
      userId: 0
    },
    newEventMember: {
      userId: 0
    }
  }

  constructor(public dialogDisplay: MatDialogRef<EventFollowsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private router: Router, private cookieService: CookieService,
    private userEventService: UserEventService, private activateRoute: ActivatedRoute, private eventInviteService: EventInviteService) { }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
    
  }

  onNoClick(): void
  {
    this.dialogDisplay.close();
  }

  // this is where our click buttons and routing 
  
  display(userId: number): void
  {
    console.log("DISPLAY UserID: ", userId)
    
    this.onNoClick();

    this.router.navigate(['/profile/', userId], { replaceUrl: true })
    .then(
      ()=> 
      {
        window.location.reload();
      }
    )
  }

  invite(userId: number, eventId: number) {
    this.eventInvite.eventInviter.userId = this.userId;
    this.eventInvite.event.eventId = eventId;
    this.eventInvite.newEventMember.userId = userId;
    this.eventInviteService.createEventInvite(this.eventInvite).subscribe(res => {
      console.log(res)
    })
  }

}
