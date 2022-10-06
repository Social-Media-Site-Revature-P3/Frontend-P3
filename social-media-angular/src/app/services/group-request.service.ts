import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupRequest } from '../interfaces/group-request';

@Injectable({
  providedIn: 'root'
})
export class GroupRequestService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/group-requests/`;

   // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByGroupRequestId(groupRequestId: number): Observable<GroupRequest> {
    return this.http.get<GroupRequest>(`${this.baseurl}` + groupRequestId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getByGroupId(groupId: number): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(`${this.baseurl}` + 'group/' + groupId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  getByUserId(userId: number): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(`${this.baseurl}` + 'user/'+ userId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getByPending(): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(`${this.baseurl}` + 'accepted/', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  getAll(): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  createGroupRequest(groupRequest: GroupRequest): Observable<GroupRequest> {
    return this.http.post<GroupRequest>(`${this.baseurl}`, JSON.stringify(groupRequest), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateGroupRequest(groupRequest: GroupRequest): Observable<GroupRequest> {
    return this.http.put<GroupRequest>(`${this.baseurl}`, JSON.stringify(groupRequest), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByGroupRequestId(groupRequestId: number): Observable<GroupRequest> {
    return this.http.delete<GroupRequest>(`${this.baseurl}` + groupRequestId, this.httpOptions).pipe(
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
