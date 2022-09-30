import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Follow } from '../interfaces/follow';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowServiceService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/follows/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //Get a particular follow relation
  followThem(followId: number): Observable<Follow> {
    return this.http.get<Follow>(`${this.baseurl}` + followId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  //Get a list of users that are following a person
  followThemAll(followedId: number): Observable<Follow[]> {
    return this.http.get<Follow[]>(`${this.baseurl}` + 'followed/' + followedId, {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  //Gets a list of users that are being followed by a specific user
  TheyAreFollowing(followerId: number): Observable<Follow[]> {
    return this.http.get<Follow[]>(`${this.baseurl}` + 'follower/' + followerId, {headers: environment.headers, withCredentials: environment.withCredentials}).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

   //Gets everything from follow table
   WhoFollowsWho(): Observable<Follow[]> {
    return this.http.get<Follow[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

   //lets a user start following someone
   IWillFollow(follow: Follow): Observable<Follow> {
    return this.http.post<Follow>(`${this.baseurl}`, JSON.stringify(follow), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  //lets a user start following someone
  StopFollowingMe(followId: number): Observable<Follow> {
    return this.http.delete<Follow>(`${this.baseurl}` + followId, this.httpOptions).pipe(
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
