import { Component, Input} from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {
    color = 'lightgreen';
    @Input() message: Message; //@Input allows this property to be binded in other components
    //and receive data


    constructor(private messageService: MessageService ){

    }

    onEdit(){
      this.messageService.editMessage(this.message);
    }

    onDelete(){
      this.messageService.deleteMessage(this.message)
      .subscribe(
        result => console.log(result)
      );
    }

    belongsToUser(){
      return localStorage.getItem('userId') == this.message.userId;
    }
}
