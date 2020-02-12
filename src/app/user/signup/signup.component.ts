import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  customer = {
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    pass: "",
    cPass: ""
  };
  constructor() { }

  ngOnInit() {
  }
  save(signUpForm: NgForm) {
    console.log(signUpForm.form);
  }
}
