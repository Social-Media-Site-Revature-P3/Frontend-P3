import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
login: Login={
  password:this.loginForm.value.password || "",
  email: this.loginForm.value.email || ""
}
  onSubmit(e: any): void {
    e.preventDefault()
    this.login.email =  this.loginForm.value.email || ""
    this.login.password = this.loginForm.value.password || ""
    this.authService.login(this.login)
      .subscribe(
        (response) => {
          this.authService.currentUser = response
          this.router.navigate(['post-feed'])
        }
      )
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
