import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { StarComponent } from './star/star.component';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StarComponent, AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'alert', component: AlertComponent, outlet: 'popup'}
    ])
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    StarComponent,
    AlertComponent
  ]
})
export class SharedModule { }
