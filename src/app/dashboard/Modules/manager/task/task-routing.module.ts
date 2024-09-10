import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { AddEditViewComponent } from './components/add-edit-view/add-edit-view.component';

const routes: Routes = [
  { path: '', component: TaskComponent },
  { path: 'add-new', component: AddEditViewComponent },
  { path: 'edit/:id', component: AddEditViewComponent },
  { path: 'view/:id', component: AddEditViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
