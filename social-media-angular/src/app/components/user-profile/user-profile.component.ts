import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // constructor(private authService: AuthService, private dialog: MatDialog) { }
  constructor(private authService: AuthService) {}
  dialog: MatDialog;

  ngOnInit(): void {
  }

  // currUser: User = {
  //   id: 0,
  //   email: "",
  //   nickname: "",
  //   password: "",
  //   firstName: "",
  //   lastName: "",
  //   aboutMe: "",
  //   profilePicutre: ""
  // }

  currUser: User = {
    userId: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  }

  followUser() {

  }

}
