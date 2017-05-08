import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';


@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'

})

export class MessageInputComponent {

  constructor(private messageService: MessageService){} //constructor for the message.service

   onSubmit(form: NgForm){ //ng form creates an object from angular
     const message = new Message(form.value.content, 'josh'); //new message created from the message model // within the Angualr object
     this.messageService.addMessage(message) //using the addMessage() method from the service
     .subscribe(
        data => console.log('response from service', data),
        error => console.error('error', error)
     );
     //will console.log the Message Array in the Service
     form.resetForm();
   }


}
