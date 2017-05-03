import { Component, OnInit} from '@angular/core';
import { MessageService } from './message.service';
import { Message } from '../messages/message.model';

@Component({
  selector: 'app-message-list',
  template: `
      <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message" (editClicked)="message.content = $event"
       *ngFor="let message of messages">
      </app-message>
      </div>`

})

export class MessageListComponent implements OnInit {

  messages: Message[]; //points to the array in the message service

  constructor(private messageService: MessageService){}

  ngOnInit() { //used with the service
    this.messages = this.messageService.getMessages(); //initalizes the getMessages() from the service
  }

}
