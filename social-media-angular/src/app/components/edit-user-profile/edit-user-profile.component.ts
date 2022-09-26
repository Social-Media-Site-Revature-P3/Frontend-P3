import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import User from 'src/app/models/User';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditUserProfileComponent>, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl: FormControl;
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9\\.\\-_]+@[A-Za-z0-9\\-]+\\.[A-Za-z]{2,5}$")])
  firstNameFormControl = new FormControl('', Validators.required)
  lastNameFormControl = new FormControl('', Validators.required)

  // check to make sure dialog is filled and is not missing information
  _info: boolean = false;

  _nonUpdatedUser: User = {
    id: this.data.id,
    firstName: this.data.firstName,
    lastName: this.data.lastName,
    email: this.data.email,
  }
  

  _updateUser: User = {
    id: 0,
    firstName: "",
    lastName: "",
    email: ""
  }

  cancelUpdate() {
    this.dialogRef.close(this._nonUpdatedUser);   
  }

  clearFirstName() {
    this.data.firstName = '';
  }

  clearLastName() {
    this.data.lastName = '';
  }

  clearEmail() {
    this.data.email = '';
  }

  onSubmit() {
    if(this.emailFormControl.valid &&
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid) {
        this.dialogRef.close(this._updateUser);
    }else{
      this._info = true
    }
  }
}
