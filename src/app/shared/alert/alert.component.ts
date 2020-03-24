import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

get messages() {
  return this.alertService.alerts;
}

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
