import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {User} from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
    profilePicutre: ""
  };
  userId: number;

  constructor(private authService: AuthService, private cookieService: CookieService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId')
    console.log(this.userId)
    this.userService.GetUser(this.userId).subscribe(user => {
      console.log(user)
      this.user.userId = user.userId;
      this.user.email = user.email;
      this.user.nickname = user.nickname;
      this.user.password = user.password;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.aboutMe = user.aboutMe;
      this.user.profilePicutre = user.profilePicutre;
    })
    console.log(this.user)
  }

}
