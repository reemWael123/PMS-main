import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(private _HttpClient: HttpClient) {}

  TASKS(): Observable<any> {
    return this._HttpClient.get('Task/count');
  }
  myProjectNum(myParams: Params): Observable<any> {
    return this._HttpClient.get('Project/manager', { params: myParams });
  }
  allProjectNum(myParams: Params): Observable<any> {
    return this._HttpClient.get('Project', { params: myParams });
  }
  deleteproject(id: number): Observable<any> {
    return this._HttpClient.delete(`Project/${id}`);
  }
  deleteTask(id: number): Observable<any> {
    return this._HttpClient.delete(`Task/${id}`);
  }
  usercount(): Observable<any> {
    return this._HttpClient.get('Users/count');
  }
  getCurrentProfile(): Observable<any> {
    return this._HttpClient.get(`Users/currentUser`);
  }
  updateProfile(data: FormData): Observable<any> {
    return this._HttpClient.put(`Users`, data);
  }
}
