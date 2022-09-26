import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {Login} from "../../interfaces/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  emailPasswordError:boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(e: any): void {
    e.preventDefault()
    if(this.loginForm.valid) {
      let login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login)
        .subscribe( {
            next: (response) => {
              this.emailPasswordError = false;
              this.authService.currentUser = response
              this.router.navigate(['post-feed'])
            },
            error: (err) => {
              this.emailPasswordError = true;
            }
        }

        )
    }else {
      this.loginForm.markAllAsTouched();
    }
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
