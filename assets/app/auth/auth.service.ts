import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'; //used with Map()
import { Observable } from 'rxjs';
import { User } from './user.model'; //brinngs in user object

@Injectable() //needs to be used in order to inject a service in a service with HTTP

export class AuthService {
  constructor(private http: Http){}

  signup(user: User){
    const body = JSON.stringify(user); //this sets up the data being passed
    const headers = new Headers({'Content-Type': 'application/json'}); //informs backend that it's getting JSON data
    return this.http.post('http://localhost:3000/user',body, {headers: headers})  //body containts the data being passed
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(error.json()));
  }
}
