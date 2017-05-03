import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {
    color = 'lightgreen';
    @Input() message: Message; //@Input allows this to be used elsewhere is used in the app.comp.html for property binding
    @Output() editClicked = new EventEmitter<string>(); //@Output creates an evernt emitter that can be used globaly editClciked()

    onEdit(){
      this.editClicked.emit('A new value');
    }
}
