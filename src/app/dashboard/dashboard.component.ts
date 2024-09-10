import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isToggle = false;
  receiveToggle(data: boolean) {
    this.isToggle = data;
  }
}
