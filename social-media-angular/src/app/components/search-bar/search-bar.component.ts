import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Name } from 'src/app/interfaces/name';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{


  searchTerm: string = "";
  userId: number = 0;
  showSearch: boolean = false;
  user: User[] = [{
    userId: 0,
    email: '',
    nickname: '',
    password: '',
    firstName: '',
    lastName: '',
    aboutMe: '',
    profilePicture: ''
  }]
  name: Name = {
    firstName: '',
    lastName: ''
  }
  fullName: Name = {
    firstName: '',
    lastName: ''
  }

  users$: Observable<User[]>


  constructor(private cookieService: CookieService, private userService: UserService) { }


  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId');
  }

  searchUser() {
    let searchTerm = this.searchTerm.split(' ');

    if (searchTerm.length > 0 && searchTerm.length < 3) {
      if (searchTerm.length == 1) {
        this.name.firstName = searchTerm.toString();
        this.userService.GetUsersByName(this.name).subscribe((users: User[]) => {
          this.user = users;
          this.userService.userList.emit(this.user)
        })
      } else if (searchTerm.length == 2) {
        this.fullName.firstName = searchTerm.slice(0, 1).toString();
        this.fullName.lastName = searchTerm.slice(1, 1).toString();
        this.userService.GetUsersByFullName(this.fullName).subscribe((name: User[]) => {
          this.user = name;
          this.userService.userList.emit(this.user)
        })
      }
    }
  }
  searchRoute() {

  }

  onClickShowSearch(): void {
    this.showSearch = true;
  }
  clickOutside() {
    this.showSearch = false;
  }
  hideSearch(): void{
    this.showSearch = false;
  }
  goToUserProfile(i: number) {

  }
}
