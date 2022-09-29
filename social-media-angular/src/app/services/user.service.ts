import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/User';
import { Name } from '../models/name';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  // baseurl = '${environment.baseUrl}/users';
  baseurl = 'http://localhost:8080/users';

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //Find user by User ID
  GetUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseurl}/`+userId,  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  //Find all users
  GetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseurl}`,  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  //Find user by User full name
  GetUserByFullName(name: Name): Observable<User> {
    return this.http.post<User>(`${this.baseurl}/full-name`, JSON.stringify(name), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

    //Find user by first or last name
    GetUserByName(name: Name): Observable<User> {
      return this.http.post<User>(`${this.baseurl}/name`, JSON.stringify(name), this.httpOptions).pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }

    //Update user
  UpdateUser(user: User): Observable<User> {
      return this.http.put<User>(`${this.baseurl}/`, JSON.stringify(user), this.httpOptions).pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }

  //Delete User by userId
  DeleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.baseurl}/`+userId,  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

 // Error handling
 errorHandl(error: any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}