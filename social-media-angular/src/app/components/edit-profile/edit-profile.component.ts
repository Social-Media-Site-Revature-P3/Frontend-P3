import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnInit {

  fileName = '';
_userService : UserService;

  constructor(public service: UserService) {
    this._userService = service;
   }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this._userService.UploadImage(formData);

        //upload$.subscribe();
    }
}


}




