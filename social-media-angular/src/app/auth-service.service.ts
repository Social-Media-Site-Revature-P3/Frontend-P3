import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './interfaces/user';
import { Login } from './interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  baseurl = 'http://localhost:4200/auth/';

  // Http Headers
  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
  }
 // POST
 LogMeIn(login: Login): Observable<User> {
  return this.http.post<User>(this.baseurl +"login" , JSON.stringify(login), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}  

 // POST
 LogMeOut(): Observable<User> {
  return this.http.post<User>(this.baseurl +"logout" , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}  

 // POST
 LogMeOut(): Observable<User> {
  return this.http.post<User>(this.baseurl +"logout" , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}  




 }

