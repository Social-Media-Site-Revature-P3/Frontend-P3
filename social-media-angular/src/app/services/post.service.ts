import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FollowedId } from '../interfaces/followed-id';
import { Post } from '../interfaces/post';
import { Comment} from "../interfaces/comment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl: string = `${environment.baseUrl}/post/`

  constructor(private http: HttpClient) { }

  getbyPostId(postId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}` + postId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}` + "user/" + userId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByFollowed(followedIds: FollowedId[]): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.postUrl}` + "follow", JSON.stringify(followedIds), {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByComments(postId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}` + "comments/" + postId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.postUrl}` + "comment", JSON.stringify(comment), {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.postUrl}`, JSON.stringify(post), {headers: environment.headers, withCredentials: environment.withCredentials})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  updatePost(post: Post, postId: number): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}` + "update-post/" + postId, JSON.stringify(post), {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.postUrl}` + postId, {headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  errorHandl(error: any) {
    let errorMessage = 'error, try again!';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log("Error obj: ", error);
    if(error.status == 500) {alert("Password does not contain the required characters");}
    //we can check this error object for a code: if(error.status == 401) {alert(acces denied)}
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
