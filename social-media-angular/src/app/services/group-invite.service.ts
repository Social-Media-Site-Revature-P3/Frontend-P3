import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupInvite } from '../interfaces/group-invite';

@Injectable({
  providedIn: 'root'
})
export class GroupInviteService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/group-invites/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByGroupInviteId(groupInviteId: number): Observable<GroupInvite> {
    return this.http.get<GroupInvite>(`${this.baseurl}` + groupInviteId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getByGroupId(groupId: number): Observable<GroupInvite[]> {
    return this.http.get<GroupInvite[]>(`${this.baseurl}` + 'group/' + groupId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByGroupInviterId(userId: number): Observable<GroupInvite[]> {
    return this.http.get<GroupInvite[]>(`${this.baseurl}` + 'group-inviter/'+ userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getByNewGroupMemberId(userId: number): Observable<GroupInvite[]> {
    return this.http.get<GroupInvite[]>(`${this.baseurl}` + 'new-group-member/' + userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getByPending(): Observable<GroupInvite[]> {
    return this.http.get<GroupInvite[]>(`${this.baseurl}` + 'accepted/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getAll(): Observable<GroupInvite[]> {
    return this.http.get<GroupInvite[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  createGroupInvite(groupInvite: GroupInvite): Observable<GroupInvite> {
    return this.http.post<GroupInvite>(`${this.baseurl}`, JSON.stringify(groupInvite), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateGroupInvite(groupInvite: GroupInvite): Observable<GroupInvite> {
    return this.http.put<GroupInvite>(`${this.baseurl}`, JSON.stringify(groupInvite), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByGroupInviteId(groupInviteId: number): Observable<GroupInvite> {
    return this.http.delete<GroupInvite>(`${this.baseurl}` + groupInviteId, this.httpOptions).pipe(
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
