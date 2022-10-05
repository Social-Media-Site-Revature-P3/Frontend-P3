import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/events/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByEventId(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseurl}` + eventId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByEventName(name: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseurl}` + 'name/' + name, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.baseurl}`, JSON.stringify(event), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseurl}`, JSON.stringify(event), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByEventId(eventId: number): Observable<Event> {
    return this.http.delete<Event>(`${this.baseurl}` + eventId, this.httpOptions).pipe(
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
