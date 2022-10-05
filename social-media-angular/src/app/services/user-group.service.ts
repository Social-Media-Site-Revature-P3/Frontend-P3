import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserGroup } from '../interfaces/user-group';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/user-groups/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByUserGroupId(userGroupId: number): Observable<UserGroup> {
    return this.http.get<UserGroup>(`${this.baseurl}` + userGroupId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByAdmin(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${this.baseurl}` + 'admin/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByCreator(): Observable<UserGroup> {
    return this.http.get<UserGroup>(`${this.baseurl}` + 'creator/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getBygroupId(groupId: number): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${this.baseurl}` + 'group/' + groupId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByUserId(userId: number): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${this.baseurl}` + 'user/' + userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getAll(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  createUserGroup(userGroup: UserGroup): Observable<UserGroup> {
    return this.http.post<UserGroup>(`${this.baseurl}`, JSON.stringify(userGroup), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateUserGroup(userGroup: UserGroup): Observable<UserGroup> {
    return this.http.put<UserGroup>(`${this.baseurl}`, JSON.stringify(userGroup), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByUserGroupId(userGroupId: number): Observable<UserGroup> {
    return this.http.delete<UserGroup>(`${this.baseurl}` + userGroupId, this.httpOptions).pipe(
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
