import { Component, Input, OnInit } from '@angular/core';
import { FollowService } from '../services/follow.service';
import { Follow } from '../interfaces/follow';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  // @Input('followUser')
  constructor(private followService: FollowService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  followUser(): void {
  //   let newFollow: Follow = {
  //   followedUser: {
  //       // userId: postAuthorId
  //   },
  //   followerUser: {
  //       userId: +this.cookieService.get('userId')
  //   }
  // }

  // // add following 
  // this.followService.IWillFollow(newFollow)
  // .subscribe(()=> {
  //   console.log("new follow: ", newFollow);
  // })
}

}
