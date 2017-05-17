import { Component, OnInit } from '@angular/core';
import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]

})

export class ErrorComponent implements OnInit {
  error: Error;
  display = 'none';

  constructor(private errorService: ErrorService){} //brings in  methods from the service

  onErrorHandled(){
    this.display = 'none';
  }

  //will listen to errors on load and change for any errors that may occur
  ngOnInit(){
    this.errorService.errorOccurred
    .subscribe(
      (error: Error) => {
        this.error = error; //provides the error to the local property
        this.display = 'block'; //will display the alert model
      }
    );
  }
}
