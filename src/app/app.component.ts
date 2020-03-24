import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';
import { AlertService } from './shared/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcomApp';

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  get userName() {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  get isMessageDisplayed() {
    return this.alertService.isDisplayed;
  }
  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router) { }

  displayMessages() {
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.router.navigate([{ outlets: { popup: ['alert'] } }]); // Works
    this.alertService.isDisplayed = true;
  }
  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.alertService.isDisplayed = false;
  }
  logOut(): void {
    this.authService.logout();
    this.alertService.isDisplayed = false;
    this.router.navigateByUrl('/home');
  }
}
