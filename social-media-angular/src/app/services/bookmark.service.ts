import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Bookmark } from '../interfaces/bookmark';
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) { }

  baseurl = '${environment.baseUrl}/bookmarks';

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //Get a particular bookmark
  GetBookmark(bookmarkId: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.baseurl}/`+bookmarkId,  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
   //Gets all bookmarks related to a post
  GetPostBookmarks(postId: number): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.baseurl}/post/`+postId,  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  //Gets all bookmarks related to a user
  GetUserBookmarks(userId: number): Observable<Bookmark[]> {
      return this.http.get<Bookmark[]>(`${this.baseurl}/user/`+userId,  this.httpOptions).pipe(
        retry(1),
        catchError(this.errorHandl)
      );
    }
      //Gets all bookmarks
  GetAllBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.baseurl}`,  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  //No Update parameter. Bookmark either exists, or doesn't
  //create Bookmark
  SaveBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.baseurl}/`,JSON.stringify(bookmark),  this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  //delete bookmark by bookmarkId
  RemoveBookmark(bookmarkId: number): Observable<Bookmark> {
    return this.http.delete<Bookmark>(`${this.baseurl}/`+bookmarkId,  this.httpOptions).pipe(
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
