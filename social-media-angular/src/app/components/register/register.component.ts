import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/interfaces/register';
import { SecurityQuestion } from 'src/app/interfaces/security-question';
import { SecurityService } from 'src/app/services/security.service';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/app/interfaces/follow';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nickname: new FormControl(''),
    securityQuestion: new FormControl('', [Validators.required]),
    securityAnswer: new FormControl('', [Validators.required])
  })

  register: Register= {
    email:"",
    password:"",
    firstName: "",
    lastName: "",
    nickname: ""
  }

  securityQuestion: SecurityQuestion = {
    questionId : undefined,
    question : "",
    answer : "",
    user : {
      userId: 0
    }
  }

  follow: Follow = {
    followedUser: {
      userId: 0
    },
    followerUser: {
      userId: 0
    }
  }
  constructor(
    private authService: AuthService,
    private securityService: SecurityService,
    private followService: FollowService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(e: any): void {
    e.preventDefault();
    if(this.registerForm.valid){
      let register: Register = {
        email: this.registerForm.value.email || "",
        password: this.registerForm.value.password || "",
        firstName: this.registerForm.value.firstName || "",
        lastName: this.registerForm.value.lastName || "",
        nickname: this.registerForm.value.nickname || ""
      }
     
      this.authService.register(register)
        .subscribe(
          (response) => {
            let security: SecurityQuestion = {
              question : this.registerForm.value.securityQuestion || "",
              answer : this.registerForm.value.securityAnswer || "",
              user : {
                userId: response.userId || 0
              }
            }
            this.securityService.createSecurityQuestion(security).subscribe({
              next: data => { 
                this.router.navigate(['login'])
              }
            })

            this.follow.followedUser.userId = response.userId!;
            this.follow.followerUser.userId = response.userId!;
            this.followService.IWillFollow(this.follow).subscribe();
          }
        )
    }else {
      this.registerForm.markAllAsTouched();
    }
  }
}
