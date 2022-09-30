import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { SecurityQuestion } from 'src/app/interfaces/security-question';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityServiceService } from 'src/app/services/security-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  ChangePasswordForm = new FormGroup({
    securityQuestion: new FormControl('', [Validators.required]),
  });

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  securityForm = new FormGroup({
    securityAnswer: new FormControl('', [Validators.required]),
  });

  createPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })
  user: User | any;
  emailPasswordError: boolean = false;
  securityQuestion: SecurityQuestion[] | any = [];
  showSecurityForm: boolean = false;
  showPasswordForm: boolean = false;
  showEmailForm: boolean = true;
  notConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private securityservice: SecurityServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitEmail(e: any): void {
    e.preventDefault();
    if (this.emailForm.valid) {
      this.userService
        .GetUserByEmail(`${this.emailForm.get('email')?.value}`)
        .subscribe({
          next: (data) => {
            this.user = data;
            let userId = data.userId ? data.userId : 0;
            this.securityservice
              .getSecurityQuestionsByUserId(userId)
              .subscribe({
                next: (data) => {
                  this.showSecurityForm = true;
                  this.showEmailForm = false;
                  this.showPasswordForm = false;
                  this.securityQuestion = data;
                },
              });
          },
          error: (data) => {
            console.log(data);
          },
        });
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
  onSubmitSecurity(e: any): void {
    e.preventDefault;
    if (this.securityForm.valid) {
      console.log('test');
      if (
        this.securityForm.get('securityAnswer')?.value ==
        this.securityQuestion[0].answer
      ) {
        console.log('correct');
        this.showEmailForm = false;
        this.showPasswordForm = true;
        this.showSecurityForm = false;
      } else {
        console.log('wrong');
      }
    } else {
      this.securityForm.markAllAsTouched();
    }
  }

  onSubmitPassword(e: any): void{
    e.preventDefault;
    if (this.createPasswordForm.valid) {
      if (
        this.createPasswordForm.get('newPassword')?.value ==
        this.createPasswordForm.get('confirmPassword')?.value
      ) {
        this.user.password = this.createPasswordForm.get('newPassword')?.value;
        this.userService.UpdateUser(this.user).subscribe({
          next: data => {
            this.router.navigate(['login']);
          }
        })

      } else {
        this.notConfirmPassword = true;
      }
    } else {
      this.securityForm.markAllAsTouched();
    }
  }
}
