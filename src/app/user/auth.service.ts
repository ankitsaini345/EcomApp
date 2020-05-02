import { Injectable } from '@angular/core';
import { User } from './user';
import { AlertService } from '../shared/alert/alert.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';

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
    return next.handle(modifiedRequest);
  }


  // loginWithJWT(username: string, password: string): void {
  //   if (!username || !password) {
  //     this.alertService.addAlert('Username/Password is Missing..');
  //     return;
  //   }
  //   const data = this.http.post(this.AUTH_URL, { username, password }).toPromise();
  //   this.currentUser = {
  //     id: 1,
  //     username,
  //     isAdmin: true
  //   };
  //   localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
  //   localStorage.setItem('jwt', JSON.stringify(data));
  //   return;
  // }

  async loginWithHttpBasic(username: string, password: string) {
    if (!username || !password) {
      this.alertService.addAlert('Username/Password is Missing..');
    }
    localStorage.setItem('token', 'Basic ' + btoa(username + ':' + password));
    const data = await this.http.get('http://localhost:8080/testLogin', {responseType: 'text'}).toPromise();
    if (data === 'success') {
    this.currentUser = {
      id: 1,
      username,
      isAdmin: true
    };
    localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
  } else {
    this.errorMessage = 'Invalid Credentials';
  }
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('EcomUser');
  }

  // login(username: string, password: string): void {
  //   if (!username || !password) {
  //     this.alertService.addAlert('Username/Password is Missing..');
  //     return;
  //   }
  //   if (username === 'admin') {
  //     this.currentUser = {
  //       id: 1,
  //       username,
  //       isAdmin: true
  //     };
  //     localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
  //     this.alertService.addAlert('Admin user Logged in');
  //     return;
  //   }
  //   this.currentUser = {
  //     id: 2,
  //     username,
  //     isAdmin: false
  //   };
  //   localStorage.setItem('EcomUser', JSON.stringify(this.currentUser));
  //   this.alertService.addAlert(`User ${this.currentUser.username} logged in`);
  //   return;
  // }
}

