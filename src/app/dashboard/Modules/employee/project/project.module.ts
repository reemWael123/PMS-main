import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
