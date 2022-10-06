import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventInvite } from 'src/app/interfaces/event-invite';
import { GroupInvite } from 'src/app/interfaces/group-invite';
import { EventInviteService } from 'src/app/services/event-invite.service';
import { GroupInviteService } from 'src/app/services/group-invite.service';
import { InviteListComponent } from '../invite-list/invite-list.component';

@Component({
  selector: 'app-invite-button',
  templateUrl: './invite-button.component.html',
  styleUrls: ['./invite-button.component.css']
})
export class InviteButtonComponent implements OnInit {

  @Input('userId') userId: number;
  @Input('firstName') firstName: string;

  eventInvites: EventInvite[] = [{
    eventInviteId: 0,
    accepted: false,
    event: {
      eventId: 0,
      name: ''
    },
    eventInviter: {
      userId: 0,
      firstName: '',
      lastName: ''
    },
    newEventMember: {
      userId: 0
    }
  }]

  groupInvites: GroupInvite[] = [{
    groupInviteId: 0,
    accepted: false,
    group: {
      groupId: 0,
      name: ''
    },
    groupInviter: {
      userId: 0,
      firstName: '',
      lastName: ''
    },
    newGroupMember: {
      userId: 0
    }
  }]

  constructor(private eventInviteService: EventInviteService, private groupInviteService: GroupInviteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.myInvites();
  }

  myInvites() {
    this.eventInviteService.getByNewEventMemberId(this.userId).subscribe(eventInvites => {
      this.eventInvites = eventInvites
      console.log(this.eventInvites)
    })

    this.groupInviteService.getByNewGroupMemberId(this.userId).subscribe(groupInvites => {
      this.groupInvites = groupInvites
    })
    
  }

  openInvites() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "85%";
    dialogConfig.width = "85%";
    dialogConfig.data = {
      eventInvites: this.eventInvites,
      groupInvites: this.groupInvites
    }
    this.dialog.open(InviteListComponent, dialogConfig)
  }

}
