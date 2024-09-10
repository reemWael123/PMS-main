import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Project } from '../../manager/project/interfaces/project';
import { ProjectService } from '../../manager/project/services/project.service';

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
    this._ProjectService.getProjectsEmployee(params).subscribe({
      next: (res) => {
        this.projectList = res;
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.getProjects();
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
