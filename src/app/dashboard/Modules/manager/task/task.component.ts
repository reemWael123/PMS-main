import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Task, TaskData } from './interfaces/task';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DashService } from 'src/app/dashboard/service/dash.service';
import { Router } from '@angular/router';
import { TaskService } from './services/task.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  headArray = [
    { headName: 'Title', keyName: 'title' },
    { headName: 'Status', keyName: 'status' },
    { headName: 'Description', keyName: 'description' },
    { headName: 'Project', keyName: 'project.title' },
    { headName: 'Manger', keyName: 'project.manager.userName' },
    { headName: 'Employee', keyName: 'employee.userName' },
    { headName: 'Creation Date', keyName: 'creationDate' },
    { headName: 'Modification Date', keyName: 'modificationDate' },
    {
      headName: 'Actions',
      keyName: 'actions',
      actionsData: [
        { key: 'view', icon: 'visibility' },
        { key: 'edit', icon: 'edit_square' },
        { key: 'delete', icon: 'delete' },
      ],
    },
  ];
  tasksList: Task;
  searchKey: string = '';
  searchStatus: string = '';
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(
    private _TaskService: TaskService,
    private _Router: Router,
    public dialog: MatDialog,
    private _DashService: DashService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      title: this.searchKey,
      status: this.searchStatus,
    };
    this._TaskService.getTasks(params).subscribe({
      next: (res) => {
        this.tasksList = res;
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.searchStatus = '';
    this.getTasks();
  }

  onActionClick(action: string, task: TaskData) {
    switch (action) {
      case 'edit':
        this.editProject(task);
        break;
      case 'delete':
        this.deleteTask(task);
        break;
      case 'view':
        this.viewProject(task);
        break;
    }
  }

  editProject(task: TaskData) {
    this._Router.navigate(['/dashboard/manager/tasks/edit', task.id]);
  }

  deleteTask(task: TaskData) {
    this.openDeleteDialog(task);
  }

  openDeleteDialog(task: TaskData): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { text: task.title, id: task.id },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete(result);
      }
    });
  }

  onDelete(id: number) {
    this._DashService.deleteTask(id).subscribe({
      next: (res) => {
        this._ToastrService.success('task deleted successfully', 'Success!');
      },
      complete: () => {
        this.getTasks();
      },
    });
  }

  viewProject(project: TaskData) {
    this._Router.navigate(['/dashboard/manager/tasks/view', project.id]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getTasks();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
