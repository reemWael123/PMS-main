import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [{ path: '', component: UsersComponent },
  { path: 'view/:id', component:ViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
