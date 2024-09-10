import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { addNewProject, Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _HttpClient: HttpClient) {}

  getProjects(myParams: Params): Observable<Project> {
    return this._HttpClient.get<Project>('Project/manager', {
      params: myParams,
    });
  }

  getProjectsEmployee(myParams: Params): Observable<Project> {
    return this._HttpClient.get<Project>('Project/employee', {
      params: myParams,
    });
  }

  addNewProject(data:addNewProject): Observable<any>{
    return this._HttpClient.post('Project', data);
  }

  getProjectById(id: number):Observable<any>{
    return this._HttpClient.get(`Project/${id}`);
  }

  updateProject(id:number, data:addNewProject): Observable<any>{
    return this._HttpClient.put(`Project/${id}`, data);
  }
}
