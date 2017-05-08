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
    @Input() message: Message; //@Input allows this to be used elsewhere is used in the app.comp.html for property binding


    constructor(private messageService: MessageService ){

    }

    onEdit(){
      this.messageService.editMessage(this.message);
    }

    onDelete(){
      this.messageService.deleteMessage(this.message);
    }
}
