import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'; //used with Map()
import { Observable } from 'rxjs';
import { User } from './user.model'; //brinngs in user object
import { ErrorService } from '../errors/error.service';

@Injectable() //needs to be used in order to inject a service in a service with HTTP
export class AuthService {
  constructor(private http: Http, private errorService: ErrorService){}

  signup(user: User){
    const body = JSON.stringify(user); //this sets up the data being passed
    console.log('body', body);
    const headers = new Headers({'Content-Type': 'application/json'}); //informs backend that it's getting JSON data
    return this.http.post('http://localhost:3000/user', body, {headers: headers})  //body containts the data being passed
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  signin(user: User){
    const body = JSON.stringify(user); //this sets up the data being passed
    console.log('body', body);
    const headers = new Headers({'Content-Type': 'application/json'}); //informs backend that it's getting JSON data
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})  //body containts the data being passed
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  logout(){
    localStorage.clear();
  }

  //checks if the user is logged in via local storage
  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

}
