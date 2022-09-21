import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Likes } from '../models/likes'
import { Post } from '../models/Posts';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  //Base url
  baseurl = 'http://localhost:8080/likes/'
  constructor(private http: HttpClient) { }

  //Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  //Create like
  CreateLike(data : Likes) : Observable<Likes> {
    return this.http.post<Likes>(this.baseurl , JSON.stringify(data) , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  //Get by Post ID, show all likes related to a specific post
  GetByPostId(id : number) : Observable<Likes[]> { 
    return this.http.get<Likes[]>(this.baseurl + 'post/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  //Delete a like, unliking something that has been liked before
  DeleteLike(id : number) { 
    return this.http.delete<Likes>(this.baseurl + id , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  //updating whether a post is liked
  UpdateLike(likes: Likes): Observable<Likes> {
    return this.http.put<Likes>(this.baseurl, JSON.stringify(likes), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  //what is the difference between deleting a like and updating a like?
  //we have it set as a boolean right now, need to talk about it with someone else

  errorHandl(error : any) {
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
