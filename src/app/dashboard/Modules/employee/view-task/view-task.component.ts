import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { EmployeeTaskService } from './Services/employee-task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  todo: any = [];
  done: any = [];
  inProgress: any = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const taskId = event.item.data.id;
      this.onUpdateTaskStatus(taskId, event.container.id);
    }
  }


  onGetMyTasks() {
    this._EmployeeTaskService.getMyTasks().subscribe({
      next: (res) => {
        const allMyTasks = res.data;
        this.todo = allMyTasks.filter((allMyTasks: any) => allMyTasks.status === 'ToDo');
        this.inProgress = allMyTasks.filter((allMyTasks: any) => allMyTasks.status === 'InProgress');
        this.done = allMyTasks.filter((allMyTasks: any) => allMyTasks.status === 'Done');
      }
    })
  }

  onUpdateTaskStatus(id: number, newStatus: string) {
    const statusData = { status: newStatus };

    this._EmployeeTaskService.updateTaskStatus(id, statusData).subscribe({
      next: (res) => {
      },
      error: (err) => {
      }
    })
  }

  constructor(private _EmployeeTaskService: EmployeeTaskService) { }
  ngOnInit(): void {
    this.onGetMyTasks();
  }
}
