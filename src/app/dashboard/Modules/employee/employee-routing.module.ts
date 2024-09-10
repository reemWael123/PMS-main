import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: 'projects', loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule) },
      { path: 'view-task', loadChildren: () => import('./view-task/view-task.module').then(m => m.ViewTaskModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
