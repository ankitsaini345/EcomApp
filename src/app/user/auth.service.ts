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
    const tempUser = sessionStorage.getItem('EcomUser');
    if (tempUser) {
      this.currentUser = JSON.parse(tempUser);
      return true;
    } else {
      return false;
    }
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
      sessionStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
      this.alertService.addAlert('Admin user Logged in');
      return;
    }
    this.currentUser = {
      id: 2,
      userName,
      isAdmin: false
    };
    sessionStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
    this.alertService.addAlert(`User ${this.currentUser.userName} logged in`);
    return;
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('EcomUser');
  }
}
