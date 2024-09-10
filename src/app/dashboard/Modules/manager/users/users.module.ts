import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './components/view/view.component';
import { BlockComponent } from './components/block/block.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';


@NgModule({
  declarations: [
    UsersComponent,
    ViewComponent,
    BlockComponent,
    ChangepasswordComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ]
})
export class UsersModule { }
