import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.baseUrl}/groups/`;

   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByGroupId(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseurl}` + groupId, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getByGroupName(name: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseurl}` + 'name/' + name, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseurl}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.baseurl}`, JSON.stringify(group), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.baseurl}`, JSON.stringify(group), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteByGroupId(groupId: number): Observable<Group> {
    return this.http.delete<Group>(`${this.baseurl}` + groupId, this.httpOptions).pipe(
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
