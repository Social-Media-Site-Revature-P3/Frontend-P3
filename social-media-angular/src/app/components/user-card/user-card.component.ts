import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Follow } from 'src/app/interfaces/follow';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user: User = {
    userId: 0,
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  };
  userId: number;

  constructor(private authService: AuthService, private cookieService: CookieService, private userService: UserService, private followService: FollowService) { }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
    this.userService.GetUser(this.userId).subscribe(user => {
      this.user.userId = user.userId;
      this.user.email = user.email;
      this.user.nickname = user.nickname;
      this.user.password = user.password;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.aboutMe = user.aboutMe;
      this.user.profilePicture = user.profilePicture;
    })
  }

  followUser(postAuthorId: number): void {
      let newFollow: Follow = {
      followedUser: {
           userId: postAuthorId
      },
      followerUser: {
          userId: +this.cookieService.get('userId')
      }
    }
  
    // add following 
    this.followService.IWillFollow(newFollow)
    .subscribe(()=> {
      console.log("new follow: ", newFollow);
    })
  }

}
