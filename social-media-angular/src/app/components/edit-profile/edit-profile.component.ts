import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnInit {

  // Instantiate service classes
  userService: UserService;
  authService: AuthService;
  public dialog: MatDialog;
  fileName = '';
  hide = true;
  userId: number;
  

  
  constructor(private router: Router, private _userService: UserService, private _authService: AuthService, private cookieService: CookieService) { 
    this.userService = _userService;
    this.authService = _authService;
    this.cookieService = cookieService;
  }

  // user: User = {} as User;
  user: User = {
    userId: +this.cookieService.get('userId'),
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    profilePicture: ""
  }

  
  ngOnInit(): void {
    this.userService.GetUser(this.user.userId!).subscribe(data => {
      this.user = data;
    })
  }

  UpdateUser() {
    //this.user.userId = this.authService.currentUser.userId;

    console.log(this.user.userId)
    this.userService.UpdateUser(this.user).subscribe(updateUser => {
      console.log(updateUser);
      alert('Successfuly Updated User!');
    })
  }

  deleteAccount() {
    //this.user.userId = this.authService.currentUser.userId;

    let text = "Sorry to see you go, confirm to delete your account.";
    if (confirm(text) == true) {
      console.log("user to be deleted: " + this.user.userId)
      this.userService.DeleteUser(this.user.userId!).subscribe()
      alert('Successfully Deleted Account');
      this.router.navigate(["login"])
    } else {
      this.router.navigate(["edit-profile"]);
    }
  }
}