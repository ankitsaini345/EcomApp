import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;  //Root Form group

  firstName= ''
  lastName = ''
  email = ''
  mobile = ''
  password = ''
  cPassword = ''

  constructor() { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      mobile : new FormControl(),
      password : new FormControl(),
      cPassword : new FormControl()
    });
    this.signUpForm.patchValue({
      firstName : 'testName'
    });
  }
  save() {
    console.log(this.signUpForm.value);
  }
  
}
