import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  customer = {
    email: '',
    pass: ''
  };
  errorMessage: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.errorMessage = '';
  }

  async save(loginForm: NgForm) {
    await this.authService.loginWithHttpBasic(loginForm.form.value.email, loginForm.form.value.password);
    if (this.authService.isLoggedIn) {
      const url = this.authService.redirectUrl;
      this.authService.redirectUrl = '';
      if (url) {
        this.router.navigate([url]);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = this.authService.errorMessage;
    }

  }
}
