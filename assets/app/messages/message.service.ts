
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'; //Angular third pary library used with the .map() method
import { Observable } from 'rxjs';

import { Message } from './message.model';
//This is a service, methods / data in the service can ber injected into components for use
//Message info is based on the Message model for blueprinted data for a Message.
//Below private messages is an array of Messages

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  constructor(private http: Http){}

  addMessage(message: Message){
      this.messages.push(message);
      const body = JSON.stringify(message); //changes message to JSON
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/message', body, {headers: headers}) //this sets up an observable route to app.js then to DB
      .map((response: Response) => response.json()) //transforms the data from the server
      .catch((error: Response) => Observable.throw(error.json()));
  } //you must subscribe to this observable in order to send / receive requests



  getMessages(){
    return this.http.get('http://localhost:3000/message')
    .map((response: Response) => {
      console.log(response);
      const messages = response.json().obj;
      let transformedMessages: Message[] = [];
      for(let message of messages){
        transformedMessages.push(new Message(message.content, 'dummy', message.id, null));
      }
      this.messages = transformedMessages;
      return transformedMessages;
    })
    .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
