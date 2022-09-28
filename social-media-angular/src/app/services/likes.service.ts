import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Like } from '../interfaces/like'
import { Post } from '../interfaces/post';

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
  CreateLike(data : Like) : Observable<Like> {
    return this.http.post<Like>(this.baseurl , JSON.stringify(data) , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  //Get by Post ID, show all likes related to a specific post
  GetByPostId(id : number) : Observable<Like[]> {
    return this.http.get<Like[]>(this.baseurl + 'post/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  //Delete a like, unliking something that has been liked before
  DeleteLike(id : number) {
    return this.http.delete<Like>(this.baseurl + id , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  //updating whether a post is liked
  UpdateLike(likes: Like): Observable<Like> {
    return this.http.put<Like>(this.baseurl, JSON.stringify(likes), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

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
