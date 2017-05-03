import { Message } from './message.model';
//This is a service, methods / data in the service can ber injected into components for use
//Message info is based on the Message model for blueprinted data for a Message.
//Below private messages is an array of Messages

export class MessageService {
  private messages: Message[] = [];

  addMessage(message: Message){
      this.messages.push(message);
      console.log(this.messages);
  }

  getMessages(){
    return this.messages;
  }

  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
