import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // Instantiate service classes
  userService: UserService;

  public dialog: MatDialog;
  
  constructor(private router: Router, userService: UserService, private authService: AuthService) { 
    this.userService = userService;
  }

  user: User = {} as User;
  ngOnInit(): void {
    this.user = this.authService.currentUser
  }

  // Create updateUser of type User
  updateUser: User = {
      userId: this.user.userId,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      nickname: "",
      aboutMe: "",
      profilePicutre: "",
  }

  

  UpdateUser() {
    this.userService.UpdateUser(this.updateUser).subscribe(user => {
      console.log(user.userId);
      console.log(user);
    })
  }

  profilePicutre: string;

  profilePictureDialog() {
    const dialogRef = this.dialog.open(UploadProfilePictureDialog, {
      width: '250px',
      data: { profilePicutre: this.profilePicutre},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
      this.profilePicutre = result;
    });
  }
}

@Component({
  selector: './upload-profile-picture-dialog',
  templateUrl: './upload-profile-picture-dialog.html',
})
export class UploadProfilePictureDialog {
  constructor(
    public dialogRef: MatDialogRef<UploadProfilePictureDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}