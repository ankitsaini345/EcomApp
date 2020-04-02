import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'home', component: AppComponent },
      {
        path: 'products', canActivate: [AuthGuard],
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
