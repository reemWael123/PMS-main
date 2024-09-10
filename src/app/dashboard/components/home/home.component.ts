import { DashService } from './../../service/dash.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  taskCount: any;
  pagesize= 1000;
  pageNumber = 1;
  projects: any;
  counter: number = 0;
  progress: any;
  activated: number = 0;
  deactivated: number;

  Username = localStorage.getItem('userName');
  role: string | null;
  constructor(
    private _DashService: DashService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this._DashService.usercount().subscribe({
      next: (res) => {
        this.activated = res.activatedEmployeeCount;
        this.deactivated = res.deactivatedEmployeeCount;
        const ctx = document.getElementById('myChart');
        new Chart('myChart', {
          type: 'doughnut',
          data: {
            labels: ['active', 'inactive'],
            datasets: [
              {
                label: '# of Votes',
                data: [this.activated, this.deactivated],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    });
    this.role = this._AuthService.userRole;
    if (this.role !== 'Employee') {
      this.getTasks();
      this.getMyProjects();
      this.getAllProject();
    }
  }

  getTasks() {
    this._DashService.TASKS().subscribe({
      next: (res) => {
        this.taskCount = res;
      },
    });
  }
  getMyProjects() {
    let data = {
      pageSize: this.pagesize,
      pageNumber: this.pageNumber,
    };
    
    this._DashService.myProjectNum(data).subscribe({
      next: (res) => {
        this.projects = res;
      },
    });
  }
  getAllProject() {
    let data = {
      pageSize: this.pagesize,
      pageNumber: this.pageNumber,
    };
    this._DashService.allProjectNum(data).subscribe({
      next: (res) => {
        this.progress = res;
        if (this.progress.data.isActivated == true) {
          this.counter = this.counter + 1;
        }
      },
    });
  }
}
