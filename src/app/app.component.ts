import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AlertService } from './shared/alert/alert.service';
import { slideInAnimation } from './shared/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'EcomApp';
  loading = true;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  get username() {
    if (this.authService.currentUser) {
      return this.authService.currentUser.username;
    }
    return '';
  }
  get isMessageDisplayed() {
    return this.alertService.isDisplayed;
  }
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router) {
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

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
