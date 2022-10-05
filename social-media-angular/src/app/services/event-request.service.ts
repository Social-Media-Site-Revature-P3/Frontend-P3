import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventRequest } from '../interfaces/event-request';

@Injectable({
  providedIn: 'root'
})
export class EventRequestService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/event-requests/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByEventRequestId(eventRequestId: number): Observable<EventRequest> {
    return this.http.get<EventRequest>(`${this.baseurl}` + eventRequestId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getByEventId(eventId: number): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(`${this.baseurl}` + 'event/' + eventId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  getByUserId(userId: number): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(`${this.baseurl}` + 'user/'+ userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getByPending(): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(`${this.baseurl}` + 'accepted/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getAll(): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  createEventRequest(eventRequest: EventRequest): Observable<EventRequest> {
    return this.http.post<EventRequest>(`${this.baseurl}`, JSON.stringify(eventRequest), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateEventRequest(eventRequest: EventRequest): Observable<EventRequest> {
    return this.http.put<EventRequest>(`${this.baseurl}`, JSON.stringify(eventRequest), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByEventRequestId(eventRequestId: number): Observable<EventRequest> {
    return this.http.delete<EventRequest>(`${this.baseurl}` + eventRequestId, this.httpOptions).pipe(
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
