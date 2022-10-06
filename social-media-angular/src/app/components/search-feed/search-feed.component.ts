import { Component, ElementRef, OnInit, ViewChild,Input, } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Name } from 'src/app/interfaces/name';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit{

  feedUsers: User[] = [{
    userId: 0,
    email: '',
    nickname: '',
    password: '',
    firstName: '',
    lastName: '',
    aboutMe: '',
    profilePicture: ''
  }]
searchTerm: string = "";
name : Name = {
  firstName : '',
  lastName: ''
}
fullName : Name = {
  firstName : '',
  lastName : ''
}
  userId: number = 0;

  constructor(private cookieService: CookieService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId');
    this.userService.userList
      .subscribe(
        (users: User[]) => {
          this.feedUsers = users
        }
      );
  }


  goToUserProfile(i: number){

  }
}
