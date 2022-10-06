import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserEvent } from 'src/app/interfaces/user-event';
import { UserGroup } from 'src/app/interfaces/user-group';
import { EventInviteService } from 'src/app/services/event-invite.service';
import { GroupInviteService } from 'src/app/services/group-invite.service';
import { UserEventService } from 'src/app/services/user-event.service';
import { UserGroupService } from 'src/app/services/user-group.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

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

  userGroup: UserGroup = {
    user: {
      userId: 0
    },
    group: {
      groupId: 0
    },
    creator: false,
    admin: false
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InviteListComponent>, 
              private router: Router, private userEventService: UserEventService, private userGroupService: UserGroupService,
              private eventInviterService: EventInviteService, private groupInviteService: GroupInviteService) { }

  ngOnInit(): void {
  }

  

  close() {
    this.dialogRef.close()
  }

  displayEvent(eventId: number): void
  {    
    this.close();

    this.router.navigate(['/event-page/', eventId], { replaceUrl: true })
    .then(
      ()=> 
      {
        window.location.reload();
      }
    )

    
  }

  displayGroup(groupId: number): void
  {    
    this.close();

    this.router.navigate(['/group-page/', groupId], { replaceUrl: true })
    .then(
      ()=> 
      {
        window.location.reload();
      }
    )
  }

  acceptEvent(userId: number, eventId: number, inviteId: number, i: number) {
    this.userEvent.event.eventId = eventId;
    this.userEvent.user.userId = userId;
    this.userEventService.createUserEvent(this.userEvent).subscribe(() => {
      this.eventInviterService.deleteByEventInviteId(inviteId).subscribe();
      this.data.eventInvites.splice(i, 1);

    })
  }

  declineEvent(inviteId: number, i: number) {
    this.eventInviterService.deleteByEventInviteId(inviteId).subscribe();
    this.data.eventInvites.splice(i, 1);
  }

  acceptGroup(userId: number, groupId: number, inviteId: number, i: number) {
    this.userGroup.group.groupId = groupId;
    this.userGroup.user.userId = userId;
    this.userGroupService.createUserGroup(this.userGroup).subscribe(() => {
      this.groupInviteService.deleteByGroupInviteId(inviteId).subscribe();
      this.data.groupInvites.splice(i, 1);

    })
  }

  declineGroup(inviteId: number, i: number) {
    this.groupInviteService.deleteByGroupInviteId(inviteId).subscribe();
    this.data.groupInvites.splice(i, 1);
  }

}
