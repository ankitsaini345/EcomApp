import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ])
  ],
  exports: []
})
export class UserModule { }
