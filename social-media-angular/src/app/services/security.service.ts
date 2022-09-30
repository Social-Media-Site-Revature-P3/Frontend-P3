import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SecurityQuestion } from '../interfaces/security-question';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityQuestionUrl: string = `${environment.baseUrl}/security-question/`

  constructor(private http: HttpClient) { }

  
  createSecurityQuestion(securityQuestion : SecurityQuestion): Observable<SecurityQuestion> {
    return this.http.post<SecurityQuestion>(`${this.securityQuestionUrl}` , JSON.stringify(securityQuestion), {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  resetPassword(securityQuestion: SecurityQuestion, userId: number): Observable<SecurityQuestion> {
    return this.http.post<SecurityQuestion>(`${this.securityQuestionUrl}` + "userId/" + userId, JSON.stringify(securityQuestion), {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  updateSecurityQuestion(securityQuestion : SecurityQuestion) : Observable<SecurityQuestion> {
    return this.http.put<SecurityQuestion>(`${this.securityQuestionUrl}` , JSON.stringify(securityQuestion) , {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getSecurityQuestion(id : number): Observable<SecurityQuestion> {
    return this.http.get<SecurityQuestion>(`${this.securityQuestionUrl}` + id, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getSecurityQuestionsByUserId(userId: number): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(`${this.securityQuestionUrl}` + "user/" + userId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getSecurityQuestions(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(`${this.securityQuestionUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  deleteSecurityQuestion(id : number) {
    return this.http.delete<SecurityQuestion>(`${this.securityQuestionUrl}` + id, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1), 
      catchError(this.errorHandl)
    )
  }

  deleteSecurityQuestionByQuestion(securityQuestion : SecurityQuestion) {
    return this.http.delete<SecurityQuestion>(`${this.securityQuestionUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1), 
      catchError(this.errorHandl)
    )
  }

  errorHandl(error : any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
