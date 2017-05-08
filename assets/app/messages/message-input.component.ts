import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';


@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'

})

export class MessageInputComponent implements OnInit{
   message: Message;

  constructor(private messageService: MessageService){} //constructor for the message.service

   //this method will handle both creating new massages and updating messages
   onSubmit(form: NgForm){ //ng form creates an object from angular
     if(this.message){ //edits an exhisting message
         this.message.content = form.value.content;
         this.message = null;
     } else { //creates a new message
       const message = new Message(form.value.content, 'josh'); //new message created from the message model // within the Angualr object
       this.messageService.addMessage(message) //using the addMessage() method from the service
       .subscribe(
          data => console.log('response from service', data),
          error => console.error('error', error)
       );
     }
     //will console.log the Message Array in the Service
     this.message = null; // to reset when updating
     form.resetForm(); // to reset when submiting a new message
   }

   onClear(form: NgForm){
     form.resetForm();
   }

  ngOnInit(){
    this.messageService.messageIsEdit.subscribe(
        (message: Message) => this.message = message
    );
  }

}
