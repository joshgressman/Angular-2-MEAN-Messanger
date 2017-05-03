import { Component} from '@angular/core';
import { MessageService } from './message.service'
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'

})

export class MessageInputComponent {
  constructor(private messageService: MessageService){} //constructor for the message.service

   onSave(value: string){
     const message = new Message(value, 'Josh'); //new message created from the message model
     this.messageService.addMessage(message); //using the addMessage() method from the service
     //will console.log the Message Array in the Service
   }
}
