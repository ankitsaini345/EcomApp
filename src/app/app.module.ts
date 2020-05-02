import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'home', component: WelcomeComponent },
      {
        path: 'products', canActivate: [AuthGuard],
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    UserModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
