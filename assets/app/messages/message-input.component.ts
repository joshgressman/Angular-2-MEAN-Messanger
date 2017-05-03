import { Component} from '@angular/core';
import { MessageService } from './message.service'
import { Message } from './message.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'

})

export class MessageInputComponent {
  constructor(private messageService: MessageService){} //constructor for the message.service

   onSubmit(form: NgForm){ //ng form creates an object from angular
     const message = new Message(form.value.content, 'josh'); //new message created from the message model // within the Angualr object
     this.messageService.addMessage(message); //using the addMessage() method from the service
     //will console.log the Message Array in the Service
     form.resetForm();
   }
}
