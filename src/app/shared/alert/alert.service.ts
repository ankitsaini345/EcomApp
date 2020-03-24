import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertsVar: string[] = [];
  isDisplayed: boolean;

  get alerts(): string[] {
    return this.alertsVar;
  }

  constructor() { }

  addAlert(alert: string): void {
    const currentDate = new Date();
    this.alerts.unshift(alert + 'at ' + currentDate.toLocaleString());
  }
}
