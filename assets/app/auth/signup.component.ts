import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
   myForm: FormGroup;

   constructor(private authService: AuthService){}

  onSubmit(){
    console.log('form value', this.myForm.value.password);
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName
      );
    this.authService.signup(user)
      .subscribe(
         data => console.log(data),
         error => console.log(error)
      ); //sends data and alows you to listen to the data

    this.myForm.reset();
  }

  ngOnInit(){ //will construct the form from the html when component is initalized
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      password: new FormControl(null, Validators.required)
    });
  }
}
