import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
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

  editUserProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height= "80%";
    dialogConfig.width = "60%";
    // dialogConfig.data = {
    //   userId: this.currUser.userId,
    //   email: this.currUser.email,
    //   nickname: this.currUser.nickname,
    //   password: this.currUser.password,
    //   firstName: this.currUser.firstName,
    //   lastName: this.currUser.lastName,
    //   aboutMe: this.currUser.aboutMe,
    //   profilePicutre: this.currUser.profilePicutre
    // }

    // dialogConfig.data = {
    //   id: this.currUser.id,
    //   email: this.currUser.email,
    //   firstName: this.currUser.firstName,
    //   lastName: this.currUser.lastName
    // }

    // Open EditUserProfile component which displays the dialog box
    let dialogRef = this.dialog.open(EditUserProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updatedUser => {
      this.currUser = updatedUser;
    })
  }

  followUser() {

  }

}
