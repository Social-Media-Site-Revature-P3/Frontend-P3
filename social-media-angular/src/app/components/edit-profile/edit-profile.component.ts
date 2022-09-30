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
  userId: number;

  
  constructor(private router: Router, private _userService: UserService, private _authService: AuthService, private cookieService: CookieService) { 
    this.userService = _userService;
    this.authService = _authService;
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
    this.user.userId = this.authService.currentUser.userId;
    console.log(this.user.userId)
    this.userService.UpdateUser(this.user).subscribe(updateUser => {
      console.log(updateUser);
    })
  }

  profilePicture: string;
  profilePictureDialog() {
    const dialogRef = this.dialog.open(UploadProfilePictureDialog, {
      width: '250px',
      data: { profilePicutre: this.profilePicture},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
      this.profilePicture = result;
    });
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const upload$ = this.userService.UploadImage(formData);
        //upload$.subscribe();
    }
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