import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Event } from 'src/app/interfaces/event';
import { UserEvent } from 'src/app/interfaces/user-event';
import { EventService } from 'src/app/services/event.service';
import { UserEventService } from 'src/app/services/user-event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewEventComponent>,
              private dialog: MatDialog, private cookieService: CookieService, private eventService: EventService,
              private userEventService: UserEventService) { }

  event: Event = {
    picture: '',
    date: '',
    time: '',
    info: '',
    name: '',
    inviteOnly: false,
    request: false
  }

  invite: string;
  month: string;
  day: string;
  year: string;
  hours: string;
  minutes: string;
  time: string;
  countDays: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  countMonths: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  countYears: number[] = [2022, 2023, 2024, 2025, 2026, 2027]
  countHours: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
  countMinutes: number[] = [0,15,30,45]


  ngOnInit(): void {
  }

  submit() {
    
    this.event.date = this.month + " " + this.day + ", " + this.year
    if(this.minutes == '0') {
      this.minutes = this.minutes + '0'
    }
    this.event.time = this.hours + ":" + this.minutes + " " + this.time;
    console.log(this.event)

    this.eventService.createEvent(this.event).subscribe(newEvent => {
      this.eventService.getByEventId(newEvent.eventId!).subscribe(event => {
        let userEvent: UserEvent = {
          user: {
            userId: +this.cookieService.get('userId'),
          },
          event: {
            eventId: event.eventId!,
          },
          creator: true,
          admin: true
        }
        this.userEventService.createUserEvent(userEvent).subscribe()
        this.dialogRef.close(newEvent)
      })
    })

  }

  inviteOrRequest() {
    console.log(this.invite)
    if(this.invite == "invite") {
      this.event.inviteOnly = false;
      this.event.request = true;
    }
    if(this.invite == "request") {
      this.event.request = false;
      this.event.inviteOnly = true;
    }

  }



}
