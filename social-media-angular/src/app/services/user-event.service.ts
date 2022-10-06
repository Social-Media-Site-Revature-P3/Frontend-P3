import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEvent } from '../interfaces/user-event';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/user-events/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByUserEventId(userEventId: number): Observable<UserEvent> {
    return this.http.get<UserEvent>(`${this.baseurl}` + userEventId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByAdmin(): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(`${this.baseurl}` + 'admin/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByCreator(): Observable<UserEvent> {
    return this.http.get<UserEvent>(`${this.baseurl}` + 'creator/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByEventId(eventId: number): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(`${this.baseurl}` + 'event/' + eventId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByUserId(userId: number): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(`${this.baseurl}` + 'user/' + userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getAll(): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  createUserEvent(userEvent: UserEvent): Observable<UserEvent> {
    return this.http.post<UserEvent>(`${this.baseurl}`, JSON.stringify(userEvent), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateUserEvent(userEvent: UserEvent): Observable<UserEvent> {
    return this.http.put<UserEvent>(`${this.baseurl}`, JSON.stringify(userEvent), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByUserEventId(userEventId: number): Observable<UserEvent> {
    return this.http.delete<UserEvent>(`${this.baseurl}` + userEventId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

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
