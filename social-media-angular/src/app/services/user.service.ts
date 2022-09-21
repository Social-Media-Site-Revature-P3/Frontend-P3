import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  //Base url
  baseurl = 'http://localhost/Users/'
  constructor(private http: HttpClient) { }

  //Http Headers
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type' : 'application/json'
    })
  }

  //Find user by User ID
  findByUserId(data : User):  {
  }

  //Get a user by full name
  getUserByFullName() {
    return this.http.get<User>(this.baseurl + fullname)
  } 

  //Get a user by first name
  getUserBy


}
