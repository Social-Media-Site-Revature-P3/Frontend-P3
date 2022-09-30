import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User;

 // Http Headers
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    console.log(login)
    const res = this.http.post<any>(`${this.authUrl}/login`,JSON.stringify(login), {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
   
    res.subscribe((data) => {
      this.currentUser = data
    }) 
    return res;
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
  }


  register(register: Register): Observable<User> {
    return this.http.post<any>(`${this.authUrl}/register`, JSON.stringify(register), {headers: environment.headers}).pipe(
      retry(1),
      catchError(this.errorHandl)
    );

//  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
//    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
//    return this.http.post<User>(`${this.authUrl}/register`, payload, {headers: environment.headers});

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
