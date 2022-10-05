import { Component, OnInit } from '@angular/core';
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
  constructor(private cookieService: CookieService, private userGroupService: UserGroupService, private activatedRoute: ActivatedRoute) {}

  joined: boolean = false;
  userId: number;
  groupId: number;

  userGroup: UserGroup = {
    user: {
      userId: 0,
    },
    group: {
      groupId: 0,
    },
    creator: false,
    admin: false
  }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
    this.groupId = this.activatedRoute.snapshot.params['groupId']
    this.userGroupService.getByUserId(this.userId).subscribe((groups: UserGroup[]) => {
      console.log(groups)
      for(let group of groups) {
        if(group.group.groupId == this.groupId) {
          this.joined = true;
        }
      }
    })
  }

  joinGroup() {

  }
}
