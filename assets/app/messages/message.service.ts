
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx'; //Angular third pary library used with the .map() method
import { Observable } from 'rxjs';
import { ErrorService } from '../errors/error.service';
import { Message } from './message.model';
//This is a service, methods / data in the service can ber injected into components for use
//Message info is based on the Message model for blueprinted data for a Message.
//Below private messages is an array of Messages

@Injectable()
export class MessageService {
  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();

  constructor(private http: Http, private errorService: ErrorService){}

  addMessage(message: Message){
      const body = JSON.stringify(message); //changes message to JSON
      const headers = new Headers({'Content-Type': 'application/json'});
      //gets the token from localStorage and stores in a varable
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):'';
      //Add the token to the URL
      return this.http.post('http://localhost:3000/message' + token, body, {headers: headers}) //this sets up an observable route to app.js then to DB
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
        this.messages.push(message);
        return message;
      }) //transforms the data from the server
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  } //you must subscribe to this observable in order to send / receive requests



  getMessages(){
    return this.http.get('http://localhost:3000/message')
    .map((response: Response) => {
      console.log(response);
      const messages = response.json().obj;
      let transformedMessages: Message[] = [];
      for(let message of messages){
        transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
      }
      this.messages = transformedMessages;
      return transformedMessages;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  editMessage(message: Message){
     this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message){
    const body = JSON.stringify(message); //changes message to JSON
    const headers = new Headers({'Content-Type': 'application/json'});
    //gets the token from localStorage and stores in a varable
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):'';
    return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers}) //this sets up an observable route to app.js then to DB
    .map((response: Response) => response.json()) //transforms the data from the server
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message), 1);
    //gets the token from localStorage and stores in a varable
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token'):'';
    return this.http.delete('http://localhost:3000/message/' + message.messageId + token) //this sets up an observable route to app.js then to DB
    .map((response: Response) => response.json()) //transforms the data from the server
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }
}
