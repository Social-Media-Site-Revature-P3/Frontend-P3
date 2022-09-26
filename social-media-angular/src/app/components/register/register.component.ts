import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  register: Register= {
    email:"",
    password:"",
    firstName: "",
    lastName: ""
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(e: any): void {
    e.preventDefault()
    this.register.email = this.registerForm.value.email!
    this.register.password = this.registerForm.value.password!
    this.register.firstName = this.registerForm.value.firstName!
    this.register.lastName = this.registerForm.value.lastName!

    this.authService.register(this.register)
      .subscribe(
        (response) => {
          this.router.navigate(['login'])
        }
      )
  }

}
