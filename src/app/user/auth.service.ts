import { Injectable } from '@angular/core';
import { User } from './user';
import { AlertService } from '../shared/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private alertService: AlertService) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.alertService.addAlert('Username/Password is Missing..');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName,
        isAdmin: true
      };
      this.alertService.addAlert('Admin user Logged in');
      return;
    }
    this.currentUser = {
      id: 2,
      userName,
      isAdmin: false
    };
    this.alertService.addAlert(`User ${this.currentUser.userName} logged in`);
    return;
  }

  logout(): void {
    this.currentUser = null;
  }
}
