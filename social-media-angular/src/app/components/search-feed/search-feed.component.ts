import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Follow } from 'src/app/interfaces/follow';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';
import { Name } from 'src/app/interfaces/name';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit {

  @Input('user') user: User[]

name : Name = {
  firstName : '',
  lastName: ''
}
fullName : Name = {
  firstName : '',
  lastName : ''
}
  userId: number = 0;

  constructor(private cookieService: CookieService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId');
  }

  goToUserProfile(i: number){

  }
}
