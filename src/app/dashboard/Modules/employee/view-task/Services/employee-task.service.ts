import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeTaskService {

  constructor(private _HttpClient: HttpClient) { }
  getMyTasks(): Observable<any> {
    return this._HttpClient.get('Task', { params: { pageSize: 10000, pageNumber: 1 } })
  }

  updateTaskStatus(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`Task/${id}/change-status`, data);
  }
}
