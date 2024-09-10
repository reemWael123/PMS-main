import { Component } from '@angular/core';
import { ProjectService } from '../../../project/services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-edit-view',
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.scss'],
})
export class AddEditViewComponent {
  titleTask: string = '';
  taskId: number = 0;

  allEmployees: any;
  allProjects: any;

  addNewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    employeeId: new FormControl(0, [Validators.required, Validators.min(1)]),
    projectId: new FormControl(0, [Validators.required]),
  });

  // get title() {
  //   return this.addNewForm.get('title');
  // }
  // get description() {
  //   return this.addNewForm.get('description')
  // }
  // get employeeId() {
  //   return this.addNewForm.get('employeeId')
  // }
  // get projectId() {
  //   return this.addNewForm.get('employeeId')
  // }

  constructor(
    private _Toaster: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _TaskService: TaskService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllProjects();

    if (this._ActivatedRoute.snapshot.url[0].path === 'add-new') {
      this.titleTask = 'Add a New Task';
    } else if (this._ActivatedRoute.snapshot.url[0].path === 'edit') {
      this.titleTask = 'Edit Task';
      this.taskId = +this._ActivatedRoute.snapshot.url[1].path;
      this.onGetTaskById(this.taskId);
    } else {
      this.titleTask = 'View Task';
      this.taskId = +this._ActivatedRoute.snapshot.url[1].path;
      this.onGetTaskById(this.taskId);
      this.addNewForm.disable();
    }
  }

  onSubmitForm(data: FormGroup) {
    if (this.taskId > 0 && this.titleTask === 'Edit Task') {
      this._TaskService.updateTask(this.taskId, data.value).subscribe({
        next: (res) => {},
        error: (err) => {
          this._Toaster.error(err.error.message, 'Error!');
        },
        complete: () => {
          this._Toaster.success('Task Updated Successfully', 'Success!');
          this._Router.navigate(['/dashboard/manager/tasks']);
        },
      });
    } else {
      this._TaskService.addNewTask(data.value).subscribe({
        next: (res) => {},
        error: (err) => {
          this._Toaster.error(err.error.message, 'Error!');
        },
        complete: () => {
          this._Toaster.success('Successfully Added Task', 'Success!');
          this._Router.navigate(['/dashboard/manager/tasks']);
        },
      });
    }
  }

  getTitleErrorMessage() {
    const titleControl: any = this.addNewForm.get('title');
    return titleControl.hasError('required') ? 'Title is required.' : '';
  }
  getDescriptionErrorMessage() {
    const descriptionControl: any = this.addNewForm.get('description');
    return descriptionControl.hasError('required')
      ? 'Description is required.'
      : '';
  }
  getEmployeeErrorMessage() {
    const employeeControl: any = this.addNewForm.get('employeeId');
    return employeeControl.hasError('required') ||
      employeeControl.hasError('min')
      ? 'Select Employee is required.'
      : '';
  }
  getProjectErrorMessage() {
    const projectControl: any = this.addNewForm.get('projectId');
    return projectControl.hasError('required') || projectControl.hasError('min')
      ? 'Select Project is required.'
      : '';
  }

  onCancel() {
    this.addNewForm.reset();
  }

  onGetTaskById(id: number) {
    this._TaskService.getTaskById(id).subscribe({
      next: (res) => {
        this.addNewForm.patchValue({
          title: res.title,
          description: res.description,
          employeeId: res.employee.id,
          projectId: res.project.id,
        });
      },
      error: (err) => {
        this._Toaster.error(err.error.message, 'Error!');
      },
      complete: () => {
        // this.title;
        // this.description;
        // this.employeeId;
        // this.projectId;
      },
    });
  }

  getAllEmployees() {
    this._TaskService
      .getAllUsers({
        groups: [2],
        pageSize: 10000,
        pageNumber: 1,
      })
      .subscribe({
        next: (res) => {
          this.allEmployees = res.data;
        },
      });
  }

  getAllProjects() {
    this._TaskService
      .getAllProjectsManager({
        pageSize: 10000,
        pageNumber: 1,
      })
      .subscribe({
        next: (res) => {
          this.allProjects = res.data;
        },
      });
  }
}
