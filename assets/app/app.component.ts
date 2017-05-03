import { Component } from '@angular/core';
import { MessageService } from './messages/message.service'; //makes the service global

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService] //Service new is global in the app and does not create an instance per component
})
export class AppComponent {

}
