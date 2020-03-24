import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  customer = {
    email: '',
    pass: ''
  };
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  save(loginForm: NgForm) {
    this.authService.login(loginForm.form.value.email, loginForm.form.value.password);
    if (this.authService.isLoggedIn) {
        this.router.navigate(['/products']);
    }
  }
}
