import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';
import { Project, ProjectData } from './interfaces/project';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DashService } from 'src/app/dashboard/service/dash.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  headArray = [
    { headName: 'Title', keyName: 'title' },
    { headName: 'Description', keyName: 'description' },
    { headName: 'Creation Date', keyName: 'creationDate' },
    { headName: 'Modification Date', keyName: 'modificationDate' },
    { headName: 'Num Tasks', keyName: 'task.length' },
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
  projectList: Project;
  searchKey: string = '';

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(
    private _ProjectService: ProjectService,
    private _Router: Router,
    public dialog: MatDialog,
    private _DashService: DashService,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      title: this.searchKey,
    };
    this._ProjectService.getProjects(params).subscribe({
      next: (res) => {
        this.projectList = res;
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.getProjects();
  }

  onActionClick(action: string, project: ProjectData) {
    switch (action) {
      case 'edit':
        this.editProject(project);
        break;
      case 'delete':
        this.deleteProject(project);
        break;
      case 'view':
        this.viewProject(project);
        break;
    }
  }

  editProject(project: ProjectData) {
    // Implement edit logic
    this._Router.navigate(['/dashboard/manager/projects/edit', project.id]);
  }

  deleteProject(project: ProjectData) {
    // Implement delete logic
    this.opendeleteDialog(project);
  }

  opendeleteDialog(project: ProjectData): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { text: project.title, id: project.id },
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ondelete(result);
      }
    });
  }

  ondelete(id: number) {
    this._DashService.deleteproject(id).subscribe({
      next: (res) => {
        this._ToastrService.success(
          ' project deleted successfully',
          'Success!'
        );
      },
      complete: () => {
        this.getProjects();
      },
    });
  }
  viewProject(project: ProjectData) {
    // Implement view logic
    this._Router.navigate(['/dashboard/manager/projects/view', project.id]);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getProjects();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
