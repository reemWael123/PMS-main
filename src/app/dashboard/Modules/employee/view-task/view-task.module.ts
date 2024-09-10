import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTaskRoutingModule } from './view-task-routing.module';
import { ViewTaskComponent } from './view-task.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    ViewTaskRoutingModule,
    SharedModule
  ]
})
export class ViewTaskModule { }
