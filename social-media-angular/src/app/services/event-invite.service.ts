import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventInvite } from '../interfaces/event-invite';

@Injectable({
  providedIn: 'root'
})
export class EventInviteService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/event-invites/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByEventInviteId(eventInviteId: number): Observable<EventInvite> {
    return this.http.get<EventInvite>(`${this.baseurl}` + eventInviteId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getByEventId(eventId: number): Observable<EventInvite[]> {
    return this.http.get<EventInvite[]>(`${this.baseurl}` + 'event/' + eventId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  getByEventInviterId(userId: number): Observable<EventInvite[]> {
    return this.http.get<EventInvite[]>(`${this.baseurl}` + 'event-inviter/'+ userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getByNewEventMemberId(userId: number): Observable<EventInvite[]> {
    return this.http.get<EventInvite[]>(`${this.baseurl}` + 'new-event-member/' + userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getByPending(): Observable<EventInvite[]> {
    return this.http.get<EventInvite[]>(`${this.baseurl}` + 'accepted/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getAll(): Observable<EventInvite[]> {
    return this.http.get<EventInvite[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  createEventInvite(eventInvite: EventInvite): Observable<EventInvite> {
    return this.http.post<EventInvite>(`${this.baseurl}`, JSON.stringify(eventInvite), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateEventInvite(eventInvite: EventInvite): Observable<EventInvite> {
    return this.http.put<EventInvite>(`${this.baseurl}`, JSON.stringify(eventInvite), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByEventInviteId(eventInviteId: number): Observable<EventInvite> {
    return this.http.delete<EventInvite>(`${this.baseurl}` + eventInviteId, this.httpOptions).pipe(
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
