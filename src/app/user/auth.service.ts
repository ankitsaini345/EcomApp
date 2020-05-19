import { Injectable } from '@angular/core';
import { User } from './user';
import { AlertService } from '../shared/alert/alert.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  currentUser: User;
  redirectUrl: string;
  errorMessage: string;

  get isLoggedIn(): boolean {
    const tempUser = localStorage.getItem('EcomUser');
    if (tempUser) {
      this.currentUser = JSON.parse(tempUser);
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private alertService: AlertService,
    private http: HttpClient) {
    this.errorMessage = '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token')
      }
    });
    if (environment.inMem) {
      return next.handle(req);
    } else {
      return next.handle(modifiedRequest);
    }

  }

  async loginWithHttpBasic(username: string, password: string) {
    if (!username || !password) {
      this.alertService.addAlert('Username/Password is Missing..');
    }
    localStorage.setItem('token', 'Basic ' + btoa(username + ':' + password));
    try {
      const data = await this.http.get(environment.loginUrl, { responseType: 'text' }).toPromise();
      if (data) {
        this.currentUser = {
          id: 1,
          username,
          isAdmin: true
        };
        localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
      }
    } catch (error) {
      console.log(error.message);
      this.errorMessage = 'Invalid Credentials';
    }

  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('EcomUser');
  }

  login(username: string, password: string): void {
    if (!username || !password) {
      this.alertService.addAlert('Username/Password is Missing..');
      return;
    }
    if (username === 'admin') {
      this.currentUser = {
        id: 1,
        username,
        isAdmin: true
      };
      localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
      this.alertService.addAlert('Admin user Logged in');
      return;
    }
    this.currentUser = {
      id: 2,
      username,
      isAdmin: false
    };
    localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
    this.alertService.addAlert(`User ${this.currentUser.username} logged in`);
    return;
  }
}

