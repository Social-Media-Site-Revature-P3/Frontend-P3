import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local-storage.service';
import { Login } from "../../interfaces/login";

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

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private localService: LocalService) {}

  ngOnInit(): void {
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   document.body.classList.add("darkMode");
    // }
  }

  onSubmit(e: any): void {
    e.preventDefault()
    if(this.loginForm.valid) {
      let login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login)
        .subscribe( {next: (response) => {
              this.emailPasswordError = false;
              this.authService.currentUser = response
              this.cookieService.set('userId', response.userId!.toString(), 365, '/', 'localhost')
              this.localService.saveData('firstName', response.firstName);
              this.localService.saveData('lastName', response.lastName);
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