import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
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
    e.preventDefault();
    if(this.registerForm.valid){
      let register: Register = {
        email: this.registerForm.value.email || "",
        password: this.registerForm.value.password || "",
        firstName: this.registerForm.value.firstName || "",
        lastName: this.registerForm.value.lastName || ""
      }
      this.authService.register(register)
        .subscribe(
          (response) => {
            this.router.navigate(['login'])
          }
        )
    }else {
      this.registerForm.markAllAsTouched();
    }

//    e.preventDefault()
//    this.authService.register(this.register)
//      .subscribe(
//        (response) => {
//          this.router.navigate(['login'])
//        }
//      )
  }

}
