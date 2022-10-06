import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Group } from 'src/app/interfaces/group';
import { UserGroup } from 'src/app/interfaces/user-group';
import { UserGroupService } from 'src/app/services/user-group.service';

@Component({
  selector: 'app-group-request',
  templateUrl: './group-request.component.html',
  styleUrls: ['./group-request.component.css']
})
export class GroupRequestComponent implements OnInit {

  @Input('group') group: Group

  constructor(private cookieService: CookieService, private userGroupService: UserGroupService, private activatedRoute: ActivatedRoute) {}

  joined: boolean = false;
  userId: number;
  groupId: number;

  userGroup: UserGroup = {
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      nickname: '',
      profilePicture: '',
      email: '',
  },
  group: {
    groupId: 0,
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  },
  creator: false,
  admin: false,
}


  ngOnInit(): void {
    this.userGroup.user.userId = +this.cookieService.get('userId')
    this.userGroup.group.groupId = this.activatedRoute.snapshot.params['groupId']
    this.getGroupByUserId();


  }

  getGroupByUserId()   {
    this.userGroupService.getByUserId(this.userGroup.user.userId).subscribe((groups: UserGroup[]) => {
      for(let group of groups) {
        if(group.group.groupId == this.userGroup.group.groupId) {
          this.joined = true;
          this.userGroup = group;
        }
      }
    })
  }

  joinGroup() {
    this.userGroupService.createUserGroup(this.userGroup).subscribe((group) => {
      this.joined = true;
      this.userGroup = group;
      this.getGroupByUserId();
    })
  }

  leaveGroup() {
    this.userGroupService.deleteByUserGroupId(this.userGroup.userGroupId!).subscribe(() => {
      this.joined = false;
    })
  }
}
