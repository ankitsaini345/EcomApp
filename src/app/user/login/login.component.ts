import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  customer = {
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    pass: "",
    cPass: ""
  };
  constructor() {}

  ngOnInit() {}
  save(signUpForm: NgForm) {
    console.log(signUpForm.form);
  }
}
